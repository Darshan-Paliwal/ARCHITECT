import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();

    // Create default admin if not exists
    const existingAdmin = await User.findOne({ email: 'admin@formaarchitects.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'admin@formaarchitects.com',
        password: 'Admin@12345',
        role: 'superadmin',
      });
    }

    // Create default settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({
        firmName: 'Forma Architects',
        tagline: 'Designing spaces that inspire',
        services: [
          { title: 'Architectural Design', description: 'From concept to construction, we guide every phase.', icon: '⬜' },
          { title: 'Interior Architecture', description: 'Spaces shaped from the inside out.', icon: '⬛' },
          { title: 'Urban Planning', description: 'Designing developments for communities.', icon: '◻' },
          { title: 'Sustainable Design', description: 'Building responsibly for the future.', icon: '◼' },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Seed complete',
      credentials: { email: 'admin@formaarchitects.com', password: 'Admin@12345' },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
        }
