import prisma from '@/lib/prisma';

export const findAll = () => prisma.category.findMany();

export const findById = (id: string) =>
  prisma.category.findUnique({ where: { id } });

export const create = (title: string) =>
  prisma.category.create({ data: { title } });

export const update = (id: string, title: string) =>
  prisma.category.update({ where: { id }, data: { title } });

export const remove = (id: string) => prisma.category.delete({ where: { id } });
