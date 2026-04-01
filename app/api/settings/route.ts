import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne().lean();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const formData = await req.formData();

    const updates: any = {};
    const fields = ['firmName', 'tagline', 'primaryColor', 'secondaryColor', 'accentColor', 'heroTitle', 'heroSubtitle', 'aboutTitle', 'aboutContent', 'servicesTitle', 'contactEmail', 'contactPhone', 'contactAddress', 'metaTitle', 'metaDescription'];

    for (const field of fields) {
      const val = formData.get(field);
      if (val !== null) updates[field] = val;
    }

    const socialLinksRaw = formData.get('socialLinks');
    if (socialLinksRaw) {
      try { updates.socialLinks = JSON.parse(socialLinksRaw as string); } catch {}
    }

    // Handle image uploads
    const logoFile = formData.get('logo') as File | null;
    const heroImageFile = formData.get('heroImage') as File | null;
    const aboutImageFile = formData.get('aboutImage') as File | null;

    if (logoFile && logoFile.size > 0) {
      const buf = Buffer.from(await logoFile.arrayBuffer());
      const result = await uploadToCloudinary(buf, { folder: 'architect-firm/branding' });
      updates.logo = { url: result.url, public_id: result.public_id };
    }

    if (heroImageFile && heroImageFile.size > 0) {
      const buf = Buffer.from(await heroImageFile.arrayBuffer());
      const result = await uploadToCloudinary(buf, { folder: 'architect-firm/hero' });
      updates.heroImage = { url: result.url, public_id: result.public_id };
    }

    if (aboutImageFile && aboutImageFile.size > 0) {
      const buf = Buffer.from(await aboutImageFile.arrayBuffer());
      const result = await uploadToCloudinary(buf, { folder: 'architect-firm/about' });
      updates.aboutImage = { url: result.url, public_id: result.public_id };
    }

    const settings = await Settings.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
        }
