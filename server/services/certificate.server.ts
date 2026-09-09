import { unstable_cache } from 'next/cache';
import * as CertificateRepository from '@/server/repositories/certificate.repository';
import { Certificate, CreateCertificateInput } from '@/model/certificate';

type CertificatePageResult = {
  items: Certificate[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

const buildCertificatePage = async (
  limit: number,
  page: number
): Promise<CertificatePageResult> => {
  const currentPage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (currentPage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    CertificateRepository.findPaginated(safeLimit, skip),
    CertificateRepository.count(),
  ]);

  return {
    items,
    meta: {
      total,
      page: currentPage,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    },
  };
};

export const getCertificates = () => CertificateRepository.findAll();

export const getPaginatedCertificates = (limit: number, page: number) =>
  buildCertificatePage(limit, page);

export const getCachedPaginatedCertificates = async (
  limit: number,
  page: number
) =>
  unstable_cache(
    async () => buildCertificatePage(limit, page),
    ['certificates', 'page', `${page}`, 'limit', `${limit}`],
    { revalidate: 120, tags: ['certificates'] }
  )();

export const getCertificateById = (id: string) =>
  CertificateRepository.findById(id);

export const createCertificate = (data: CreateCertificateInput) =>
  CertificateRepository.create(data);

export const updateCertificate = (id: string, data: Record<string, unknown>) =>
  CertificateRepository.update(id, data);

export const deleteCertificate = (id: string) =>
  CertificateRepository.remove(id);
