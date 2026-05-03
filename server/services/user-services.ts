import prisma from '@/lib/prisma';
import { TUserLoginRequest } from '@/model/user';

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user: ' + error);
    return null;
  }
}

export async function loginUser({ email, password }: TUserLoginRequest) {
  try {
  } catch (error) {}
}
