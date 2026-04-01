import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';
import { isAuthenticated } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const updated = await ContactSubmission.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    await ContactSubmission.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
