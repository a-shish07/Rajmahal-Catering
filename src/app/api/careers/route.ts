import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import Career from '@/models/Career';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get('resume') as File;
    const firstName = formData.get('firstName') as string;
    const middleName = formData.get('middleName') as string;
    const lastName = formData.get('lastName') as string;
    const birthMonth = formData.get('birthMonth') as string;
    const birthDay = formData.get('birthDay') as string;
    const birthYear = formData.get('birthYear') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const startDate = formData.get('startDate') as string;

    if (!resumeFile || !firstName || !lastName || !email || !phone || !position || !startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf = resumeFile.type === 'application/pdf' || resumeFile.name.toLowerCase().endsWith('.pdf');
    const resourceType = isPdf ? 'raw' : 'auto';

    // Upload resume to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'rajmahal_resumes',
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // For raw files, ensure extension is present in URL
    let finalUrl = uploadResult.secure_url;
    if (isPdf && !finalUrl.toLowerCase().endsWith('.pdf')) {
      finalUrl += '.pdf';
    }

    await connectToDatabase();
    const newCareer = await Career.create({
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      email,
      phone,
      position,
      startDate: new Date(startDate),
      resumeUrl: finalUrl,
      resumePublicId: uploadResult.public_id,
    });

    return NextResponse.json(newCareer, { status: 201 });
  } catch (error) {
    console.error('Error processing career application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const careers = await Career.find({}).sort({ createdAt: -1 });
    return NextResponse.json(careers);
  } catch (error) {
    console.error('Error fetching career applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
