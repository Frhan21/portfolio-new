import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { certificateUpdateSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({
        message: 'Certificate with ID is not found',
        status: 404,
      });
    }
    const res = await prisma.certificate.findUnique({
      where: {
        id,
      },
    });

    if (!res) {
      return NextResponse.json({
        message: 'Certificate not found',
        status: 404,
      });
    }

    return NextResponse.json({
      message: 'Certificate fetched successfully',
      data: res,
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json({
      message: 'Error fetching data',
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { message: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      return NextResponse.json(
        { message: 'Certificate not found' },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const updates: Record<string, unknown> = {};

    const rawTitle = formData.get('title');
    if (typeof rawTitle === 'string') {
      updates.title = rawTitle;
    }

    const rawIssuer = formData.get('issuer');
    if (typeof rawIssuer === 'string') {
      updates.issuer = rawIssuer;
    }

    const rawIssuerDate = formData.get('issuer_date');
    if (typeof rawIssuerDate === 'string') {
      updates.issuer_date = rawIssuerDate;
    }

    const rawCategoryId = formData.get('categoryId');
    if (typeof rawCategoryId === 'string') {
      updates.categoryId = rawCategoryId;
    }

    const rawImage = formData.get('image');
    if (rawImage instanceof File && rawImage.size > 0) {
      updates.image = rawImage;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: 'No data provided to update' },
        { status: 400 }
      );
    }

    const validate = certificateUpdateSchema.safeParse(updates);
    if (!validate.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validate.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { image, issuer_date, ...rest } = validate.data;
    const updateData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }

    if (issuer_date) {
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

      updateData.issuer_date = parsedIssuerDate;
    }

    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${image.type};base64,${base64}`;

      if (existingCertificate.publicId) {
        try {
          await cloudinary.uploader.destroy(existingCertificate.publicId);
        } catch (cldError) {
          console.error('Error removing existing image:', cldError);
        }
      }

      const response = await cloudinary.uploader.upload(dataUrl, {
        folder: 'nextjs-upload',
      });

      updateData.image = response.secure_url;
      updateData.publicId = response.public_id;
    }

    const res = await prisma.certificate.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      message: 'Certificate updated successfully',
      status: 200,
      data: res,
    });
  } catch (error) {
    console.error('Error Updating certificate' + error);
    return NextResponse.json({
      message: 'Error Updating certificate',
      status: 500,
    });
  }
}
