'use server';

import {
  RegisterSchema,
  RegisterSchemaType,
} from '@/app/(auth)/component/form/schema/register-scheme';
import {
  registerUser,
  revokeUserSessions,
} from '@/server/services/auth.server';
import { auth } from '@/lib/auth';

export const registerAction = async (data: RegisterSchemaType) => {
  try {
    const validation = RegisterSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0].message,
      };
    }

    await registerUser({
      name: validation.data.name,
      email: validation.data.email,
      password: validation.data.password,
    });

    return {
      success: true,
      message: 'Registration successful',
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to register',
    };
  }
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
