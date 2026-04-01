import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const project = await Project.findOne({ slug: params.slug, status: 'published' }).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
