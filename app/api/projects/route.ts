import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { slugify } from '@/lib/helpers';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    const query: any = {};
    if (featured === 'true') query.featured = true;
    if (status) query.status = status;

    let q = Project.find(query).sort({ order: 1, createdAt: -1 });
    if (limit) q = q.limit(parseInt(limit));

    const projects = await q.lean();
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;
    const year = formData.get('year') as string;
    const area = formData.get('area') as string;
    const client = formData.get('client') as string;
    const featured = formData.get('featured') === 'true';
    const status = formData.get('status') as string;

    const imageFiles = formData.getAll('images') as File[];
    const uploadedImages: Array<{ url: string; public_id: string }> = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToCloudinary(buffer, { folder: 'architect-firm/projects' });
        uploadedImages.push({ url: result.url, public_id: result.public_id });
      }
    }

    const slug = slugify(title);

    const project = await Project.create({
      title, slug, description, fullDescription,
      category, location, year, area, client,
      featured, status: status || 'published',
      images: uploadedImages,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
