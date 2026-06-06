import bcrypt from 'bcryptjs';
import * as UserRepository from '@/server/repositories/user.repository';
import * as RefreshTokenRepository from '@/server/repositories/refresh-token.repository';

export async function getUser(email: string) {
  try {
    const user = await UserRepository.findByEmail(email);
    return user;
  } catch (error) {
    console.error('Error fetching user: ' + error);
    return null;
  }
}

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}

export async function revokeUserSessions(userId: string) {
  await RefreshTokenRepository.revokeAllByUserId(userId);
}
