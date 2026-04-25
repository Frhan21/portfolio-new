import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';
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

  const [items, total] = await prisma.$transaction([
    prisma.certificate.findMany({
      take: safeLimit,
      skip,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.certificate.count(),
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

export const getCertificates = async () => {
  return await prisma.certificate.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getPaginatedCertificates = async (limit: number, page: number) => {
  return buildCertificatePage(limit, page);
};

export const getCachedPaginatedCertificates = async (
  limit: number,
  page: number
) => {
  return unstable_cache(
    async () => buildCertificatePage(limit, page),
    ['certificates', 'page', `${page}`, 'limit', `${limit}`],
    {
      revalidate: 120,
      tags: ['certificates'],
    }
  )();
};

export const getCertificatebyId = async (id: string) => {
  return await prisma.certificate.findUnique({
    where: {
      id: id,
    },
  });
};

export const createCertificate = async (data: CreateCertificateInput) => {
  return await prisma.certificate.create({
    data: {
      title: data.title,
      image: data.image,
      publicId: data.publicId,
      categoryId: data.categoryId,
      issuer: data.issuer,
      issuer_date: data.issuer_date,
    },
  });
};

export const updateCertificate = async (id: string, data: Certificate) => {
  return await prisma.certificate.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      image: data.image,
      publicId: data.publicId,
      categoryId: data.categoryId,
      issuer: data.issuer,
      issuer_date: data.issuer_date,
    },
  });
};

export const deleteCertificate = async (id: string) => {
  return await prisma.certificate.delete({
    where: {
      id: id,
    },
  });
};
