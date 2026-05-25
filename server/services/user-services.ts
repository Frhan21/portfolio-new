import prisma from '@/lib/prisma';
import { TUserLoginRequest } from '@/model/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

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
    const user = await getUser(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = generateToken(payload);
    return { token, user: payload };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('An error occurred during login');
  }
}

export async function registerUser({
  name,
  email,
  password,
}: Omit<
  TUserLoginRequest & { name: string },
  'id' | 'createdAt' | 'updateAt'
>) {
  try {
    const existingUser = await getUser(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('An error occurred during registration');
  }
}
