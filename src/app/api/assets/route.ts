import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import Asset from '@/models/Asset';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    await connectToDatabase();
    const assets = await Asset.find({});
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;

    if (!file || !name) {
      return NextResponse.json({ error: 'Missing file or name' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const resourceType = isPdf ? 'raw' : 'auto';

    // Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'rajmahal_assets',
          resource_type: resourceType,
          // For raw files, Cloudinary sometimes doesn't append the extension automatically in the public_id
          public_id: isPdf ? `${name.toLowerCase()}_rajmahal.pdf` : undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // For raw files, the secure_url might sometimes be missing the extension if not handled correctly
    let finalUrl = uploadResult.secure_url;
    if (isPdf && !finalUrl.toLowerCase().endsWith('.pdf')) {
      finalUrl += '.pdf';
    }

    await connectToDatabase();
    
    // Find if asset already exists
    const existingAsset = await Asset.findOne({ name });
    
    if (existingAsset) {
      // Delete old from Cloudinary
      await cloudinary.uploader.destroy(existingAsset.publicId, { resource_type: resourceType });
      
      // Update existing
      existingAsset.url = finalUrl;
      existingAsset.publicId = uploadResult.public_id;
      existingAsset.updatedAt = new Date();
      await existingAsset.save();
      return NextResponse.json(existingAsset);
    } else {
      // Create new
      const newAsset = await Asset.create({
        name,
        url: finalUrl,
        publicId: uploadResult.public_id,
      });
      return NextResponse.json(newAsset, { status: 201 });
    }
  } catch (error) {
    console.error('Error uploading asset:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
