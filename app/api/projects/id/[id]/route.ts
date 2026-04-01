import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { slugify } from '@/lib/helpers';
import { isAuthenticated } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const project = await Project.findById(params.id).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const formData = await req.formData();

    const existingImagesRaw = formData.get('existingImages') as string;
    const existingImages = existingImagesRaw ? JSON.parse(existingImagesRaw) : [];

    const imageFiles = formData.getAll('images') as File[];
    const newImages: Array<{ url: string; public_id: string }> = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToCloudinary(buffer, { folder: 'architect-firm/projects' });
        newImages.push({ url: result.url, public_id: result.public_id });
      }
    }

    const title = formData.get('title') as string;

    const updated = await Project.findByIdAndUpdate(
      params.id,
      {
        title,
        slug: slugify(title),
        description: formData.get('description'),
        fullDescription: formData.get('fullDescription'),
        category: formData.get('category'),
        location: formData.get('location'),
        year: formData.get('year'),
        area: formData.get('area'),
        client: formData.get('client'),
        featured: formData.get('featured') === 'true',
        status: formData.get('status'),
        images: [...existingImages, ...newImages],
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(params.id);
    if (project?.images?.length) {
      for (const img of project.images) {
        await deleteFromCloudinary(img.public_id).catch(() => {});
      }
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
                        }
