import { certficateSchema } from '@/lib/validation';
import {
  createCertificate,
  getCertificates,
} from '@/server/services/certificate.server';
import { uploadImage } from '@/server/services/upload.server';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from '@/lib/api-response';
import { isAuthenticatedRequest } from '@/lib/api-auth';

export async function GET() {
  try {
    const certificate = await getCertificates();
    if (!certificate || certificate.length === 0) {
      return successResponse([], 'No certificates found', 404);
    }

    return successResponse(certificate, 'Success', 200);
  } catch (error) {
    return errorResponse('Failed to fetch certificates', error);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticatedRequest())) {
    return errorResponse('Unauthorized', undefined, 401);
  }
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
      return validationErrorResponse(validate.error.errors);
    }
    const { title, categoryId, issuer, issuer_date } = validate.data;

    const parsedIssuerDate = new Date(issuer_date);
    if (isNaN(parsedIssuerDate.getTime())) {
      return errorResponse(
        'Invalid issuer_date format. Use an ISO 8601 string such as 2024-06-15 or 2024-06-15T00:00:00Z.',
        undefined,
        400
      );
    }

    const image = formData.get('image') as File;
    if (!image) {
      return errorResponse('Image file is required', undefined, 400);
    }

    const response = await uploadImage(image);

    const imageUrl = response.imageUrl;
    if (!imageUrl) {
      return errorResponse('Failed to upload image', undefined, 500);
    }

    const publicId = response.publicId;

    const res = await createCertificate({
      title,
      image: imageUrl,
      publicId,
      categoryId,
      issuer,
      issuer_date: parsedIssuerDate,
    });
    revalidateTag('certificates', 'max');
    return successResponse(res, 'Certificate created successfully', 201);
  } catch (error) {
    console.error('Error creating data', error);
    return errorResponse('Internal Server Error', error, 500);
  }
}
