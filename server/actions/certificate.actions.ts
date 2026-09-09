'use server';

import { certficateSchema, certificateUpdateSchema } from '@/lib/validation';
import * as CertificateService from '@/server/services/certificate.server';
import { uploadImage } from '@/server/services/upload.server';
import {
  Certificate,
  CertificateActionResult,
  CertificatePaginatedResult,
} from '@/model/certificate';
import { auth } from '@/lib/auth';

const isAuthorized = async () => Boolean((await auth())?.user?.id);

export async function getCertificates(
  limit: number = 6,
  page: number = 1
): Promise<CertificatePaginatedResult> {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  return CertificateService.getPaginatedCertificates(safeLimit, safePage);
}

export async function getCertificateById(
  id: string
): Promise<Certificate | null> {
  if (!id) throw new Error('Certificate ID is required');
  return CertificateService.getCertificateById(id);
}

export async function addCertificate(
  formData: FormData
): Promise<CertificateActionResult<Certificate>> {
  if (!(await isAuthorized())) return { success: false, error: 'Unauthorized' };
  const rawData = {
    title: formData.get('title'),
    categoryId: formData.get('categoryId'),
    issuer: formData.get('issuer'),
    issuer_date: formData.get('issuer_date'),
    image: formData.get('image'),
  };

  const validated = certficateSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const parsedIssuerDate = new Date(validated.data.issuer_date);
  if (isNaN(parsedIssuerDate.getTime())) {
    return { success: false, error: 'Format tanggal issuer tidak valid.' };
  }

  const { imageUrl, publicId } = await uploadImage(validated.data.image);

  const certificate = await CertificateService.createCertificate({
    title: validated.data.title,
    image: imageUrl,
    publicId,
    categoryId: validated.data.categoryId,
    issuer: validated.data.issuer,
    issuer_date: parsedIssuerDate,
  });

  return { success: true, data: certificate };
}

export async function updateCertificate(
  id: string,
  formData: FormData
): Promise<CertificateActionResult<Certificate>> {
  if (!(await isAuthorized())) return { success: false, error: 'Unauthorized' };
  if (!id) return { success: false, error: 'Certificate ID is required' };

  const rawData = {
    title: formData.get('title'),
    categoryId: formData.get('categoryId'),
    issuer: formData.get('issuer'),
    issuer_date: formData.get('issuer_date'),
    image:
      formData.get('image') instanceof File ? formData.get('image') : undefined,
  };

  const partialSchema = certificateUpdateSchema;
  const validated = partialSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const updateData: Record<string, unknown> = {};
  if (validated.data.title) updateData.title = validated.data.title;
  if (validated.data.categoryId)
    updateData.categoryId = validated.data.categoryId;
  if (validated.data.issuer) updateData.issuer = validated.data.issuer;
  if (validated.data.issuer_date) {
    const parsedIssuerDate = new Date(validated.data.issuer_date);
    if (isNaN(parsedIssuerDate.getTime())) {
      return { success: false, error: 'Format tanggal issuer tidak valid.' };
    }
    updateData.issuer_date = parsedIssuerDate;
  }

  if (validated.data.image instanceof File && validated.data.image.size > 0) {
    const { imageUrl, publicId } = await uploadImage(validated.data.image);
    updateData.image = imageUrl;
    updateData.publicId = publicId;
  }

  const certificate = await CertificateService.updateCertificate(
    id,
    updateData
  );
  return { success: true, data: certificate as Certificate };
}

export async function deleteCertificate(
  id: string
): Promise<CertificateActionResult<{ id: string }>> {
  if (!(await isAuthorized())) return { success: false, error: 'Unauthorized' };
  if (!id) return { success: false, error: 'Certificate ID is required' };
  await CertificateService.deleteCertificate(id);
  return { success: true, data: { id } };
}
