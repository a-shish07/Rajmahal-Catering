import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if any admin exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const newAdmin = await Admin.create({
      username: 'admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    });

    return NextResponse.json({ message: 'Admin created successfully', username: newAdmin.username });
  } catch (error) {
    console.error('Error in setup:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
