import prisma from '@/lib/prisma';
import { CreateProjectInput } from '@/model/project';

export const findAll = (limit?: number) =>
  prisma.project.findMany({
    ...(limit !== undefined ? { take: limit } : {}),
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

export const findLatest = (limit: number) =>
  prisma.project.findMany({
    take: Math.max(1, limit),
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

export const findById = (id: string) =>
  prisma.project.findUnique({
    where: { id },
    include: { category: true },
  });

export const findPaginated = (limit: number, skip: number) =>
  prisma.project.findMany({
    take: limit,
    skip,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

export const count = () => prisma.project.count();

export const create = (data: CreateProjectInput) =>
  prisma.project.create({
    data: {
      title: data.title,
      image: data.image,
      publicId: data.publicId,
      demo: data.demo,
      github: data.github,
      tags: data.tags,
      categoryId: data.categoryId,
    },
  });

export const update = (id: string, data: Record<string, unknown>) =>
  prisma.project.update({ where: { id }, data });

export const remove = (id: string) => prisma.project.delete({ where: { id } });
