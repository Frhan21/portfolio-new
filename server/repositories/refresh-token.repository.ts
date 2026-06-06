import prisma from '@/lib/prisma';

export const create = (data: {
  token: string;
  userId: string;
  expiresAt: Date;
}) => prisma.refreshToken.create({ data });

export const findByToken = (token: string) =>
  prisma.refreshToken.findUnique({ where: { token } });

export const revokeAllByUserId = (userId: string) =>
  prisma.refreshToken.updateMany({
    where: { userId, revoked: false },
    data: { revoked: true },
  });

export const revokeToken = (token: string) =>
  prisma.refreshToken.update({
    where: { token },
    data: { revoked: true },
  });
