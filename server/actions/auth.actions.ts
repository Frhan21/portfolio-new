'use server';

import { RegisterSchemaType } from '@/app/(auth)/component/form/schema/register-scheme';
import { revokeUserSessions } from '@/server/services/auth.server';
import { auth } from '@/lib/auth';

export const registerAction = async (data: RegisterSchemaType) => {
  void data;
  return {
    success: false,
    error:
      'Pendaftaran publik dinonaktifkan. Hubungi pemilik portfolio untuk akses.',
  };
};

export const logoutAction = async () => {
  try {
    const session = await auth();
    if (session?.user?.id) {
      await revokeUserSessions(session.user.id);
    }

    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to logout',
    };
  }
};
