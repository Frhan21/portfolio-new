import prisma from '@/lib/prisma';
import { CreateCertificateInput } from '@/model/certificate';

export const findAll = () =>
  prisma.certificate.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

export const findById = (id: string) =>
  prisma.certificate.findUnique({
    where: { id },
    include: { category: true },
  });

export const findPaginated = (limit: number, skip: number) =>
  prisma.certificate.findMany({
    take: limit,
    skip,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

export const count = () => prisma.certificate.count();

export const create = (data: CreateCertificateInput) =>
  prisma.certificate.create({
    data: {
      title: data.title,
      image: data.image,
      publicId: data.publicId,
      categoryId: data.categoryId,
      issuer: data.issuer,
      issuer_date: data.issuer_date,
    },
  });

export const update = (id: string, data: Record<string, unknown>) =>
  prisma.certificate.update({ where: { id }, data });

export const remove = (id: string) =>
  prisma.certificate.delete({ where: { id } });
