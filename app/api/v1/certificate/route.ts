import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { certficateSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const certificate = await prisma.certificate.findMany();
    if (!certificate || certificate.length === 0) {
      return NextResponse.json(
        { message: 'No certificates found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Success',
        data: certificate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch certificates',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = {
      title: formData.get('title') as string,
      image: formData.get('image') as File,
      categoryId: formData.get('categoryId') as string,
      issuer: formData.get('issuer') as string,
      issuer_date: formData.get('issuer_date'),
    };

    const validate = certficateSchema.safeParse(data);
    if (!validate.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validate.error.errors },
        { status: 400 }
      );
    }
    const { title, categoryId, issuer, issuer_date } = validate.data;

    const parsedIssuerDate = new Date(issuer_date);
    if (isNaN(parsedIssuerDate.getTime())) {
      return NextResponse.json(
        {
          message:
            'Invalid issuer_date format. Use an ISO 8601 string such as 2024-06-15 or 2024-06-15T00:00:00Z.',
        },
        { status: 400 }
      );
    }

    const image = formData.get('image') as File;
    if (!image) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64 = buffer.toString('base64');
    const dataUrl = `data:${image.type};base64,${base64}`;

    const response = await cloudinary.uploader.upload(dataUrl, {
      folder: 'nextjs-upload',
    });

    const imageUrl = response.secure_url;
    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Failed to upload image' },
        { status: 500 }
      );
    }

    const publicId = response.public_id;

    const res = await prisma.certificate.create({
      data: {
        title,
        image: imageUrl,
        publicId,
        categoryId,
        issuer,
        issuer_date: parsedIssuerDate,
      },
    });

    return NextResponse.json(
      { message: 'Certificate created successfully', data: res },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating data', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
