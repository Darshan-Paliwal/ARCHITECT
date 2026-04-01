import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Media from '@/models/Media';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const media = await Media.findByIdAndDelete(params.id);
    if (media?.public_id) {
      await deleteFromCloudinary(media.public_id, media.resource_type).catch(() => {});
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
