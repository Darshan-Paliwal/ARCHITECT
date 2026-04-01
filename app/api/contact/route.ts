import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const contacts = await ContactSubmission.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const contact = await ContactSubmission.create(body);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
