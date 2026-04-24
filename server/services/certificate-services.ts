import prisma from '@/lib/prisma';
import { Certificate, CreateCertificateInput } from '@/model/certificate';

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
