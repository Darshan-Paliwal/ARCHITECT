import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Media from '@/models/Media';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');
    const query: any = {};
    if (type) query.resource_type = type;
    let q = Media.find(query).sort({ createdAt: -1 });
    if (limit) q = q.limit(parseInt(limit));
    const media = await q.lean();
    return NextResponse.json({ success: true, data: media });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const uploaded = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadToCloudinary(buffer, {
        folder: 'architect-firm/media',
        resource_type: file.type.startsWith('video/') ? 'video' : 'image',
      });

      const media = await Media.create({
        url: result.url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        name: file.name,
        size: file.size,
        folder: 'general',
      });
      uploaded.push(media);
    }

    return NextResponse.json({ success: true, data: uploaded }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
                                                       }
