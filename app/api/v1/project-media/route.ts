import { errorResponse, successResponse } from '@/lib/api-response';
import { isAuthenticatedRequest } from '@/lib/api-auth';
import {
  deleteProjectContentMedia,
  uploadProjectContentImage,
  uploadProjectContentPdf,
} from '@/server/services/upload.server';
import { NextRequest } from 'next/server';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const PDF_MAX_SIZE = 10 * 1024 * 1024;

const hasValidSignature = async (file: File, kind: 'image' | 'pdf') => {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (kind === 'pdf') {
    return String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-';
  }

  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png =
    bytes[0] === 0x89 && String.fromCharCode(...bytes.slice(1, 4)) === 'PNG';
  const webp =
    String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' &&
    String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  return jpeg || png || webp;
};

export async function POST(req: NextRequest) {
  if (!(await isAuthenticatedRequest())) {
    return errorResponse('Unauthorized', undefined, 401);
  }

  try {
    const formData = await req.formData();
    const kind = formData.get('kind');
    const file = formData.get('file');

    if ((kind !== 'image' && kind !== 'pdf') || !(file instanceof File)) {
      return errorResponse('File media tidak valid', undefined, 400);
    }

    const validType =
      kind === 'image'
        ? IMAGE_TYPES.includes(file.type)
        : file.type === 'application/pdf';
    const validSize =
      file.size > 0 &&
      file.size <= (kind === 'image' ? IMAGE_MAX_SIZE : PDF_MAX_SIZE);

    if (!validType || !validSize || !(await hasValidSignature(file, kind))) {
      return errorResponse(
        kind === 'image'
          ? 'Gunakan gambar JPEG, PNG, atau WebP maksimal 5MB'
          : 'Gunakan dokumen PDF maksimal 10MB',
        undefined,
        400
      );
    }

    const media =
      kind === 'image'
        ? await uploadProjectContentImage(file)
        : await uploadProjectContentPdf(file);

    return successResponse(media, 'Media berhasil diunggah', 201);
  } catch (error) {
    return errorResponse('Gagal mengunggah media', error, 500);
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticatedRequest())) {
    return errorResponse('Unauthorized', undefined, 401);
  }

  const publicId = req.nextUrl.searchParams.get('publicId') ?? '';
  const resourceType = req.nextUrl.searchParams.get('resourceType');
  const valid =
    (resourceType === 'image' &&
      publicId.startsWith('project-content/images/')) ||
    (resourceType === 'raw' &&
      publicId.startsWith('project-content/documents/'));

  if (!valid) {
    return errorResponse('Parameter media tidak valid', undefined, 400);
  }

  try {
    await deleteProjectContentMedia({
      publicId,
      resourceType: resourceType as 'image' | 'raw',
    });
    return successResponse({ publicId }, 'Media berhasil dihapus');
  } catch (error) {
    return errorResponse('Gagal menghapus media', error, 500);
  }
}
