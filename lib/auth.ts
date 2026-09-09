import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import * as UserRepository from '@/server/repositories/user.repository';
import * as RefreshTokenRepository from '@/server/repositories/refresh-token.repository';

const ACCESS_TOKEN_EXPIRES_MS = 15 * 60 * 1000; // 15 menit
const REFRESH_TOKEN_DAYS = 7; // 7 hari

async function generateAndStoreRefreshToken(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000
  );

  const refreshToken = await RefreshTokenRepository.create({
    token,
    userId,
    expiresAt,
  });

  return refreshToken.id;
}

async function verifyAndRefreshAccessToken(tokenId: string) {
  const refreshToken = await RefreshTokenRepository.findById(tokenId);

  if (
    !refreshToken ||
    refreshToken.revoked ||
    refreshToken.expiresAt < new Date()
  ) {
    return null;
  }

  return {
    id: refreshToken.userId,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await UserRepository.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        const refreshTokenId = await generateAndStoreRefreshToken(user.id);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          refreshTokenId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_EXPIRES_MS;
        token.refreshTokenId = (
          user as { refreshTokenId?: string }
        ).refreshTokenId;
      }

      if (trigger === 'update') {
        return token;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      if (!token.refreshTokenId) {
        return { ...token, exp: 0 };
      }

      const result = await verifyAndRefreshAccessToken(token.refreshTokenId);

      if (!result) {
        return { ...token, exp: 0 };
      }

      return {
        ...token,
        id: result.id,
        accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_MS,
      };
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name ?? '';
      session.user.email = token.email ?? '';
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60,
  },
  trustHost: true,
});
