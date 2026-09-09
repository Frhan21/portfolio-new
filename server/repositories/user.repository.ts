import prisma from '@/lib/prisma';

export const findByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  });

export const findAll = () =>
  prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

export const create = (data: {
  name: string;
  email: string;
  password: string;
}) => prisma.user.create({ data });
