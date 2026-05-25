'use server';

import LoginSchema, {
  LoginSchemaType,
} from '@/app/(auth)/component/form/schema/login-scheme';
import {
  RegisterSchema,
  RegisterSchemaType,
} from '@/app/(auth)/component/form/schema/register-scheme';
import { loginUser, registerUser } from '@/server/services/user-services';
import { cookies } from 'next/headers';

export const loginAction = async (data: LoginSchemaType) => {
  try {
    const validation = LoginSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0].message,
      };
    }

    const result = await loginUser({
      email: validation.data.email,
      password: validation.data.password,
    });

    const cookieStore = await cookies();
    cookieStore.set('token', result.token, {
      httpOnly: false, // allow axios to read it if needed
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to login',
    };
  }
};

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

    // Auto login
    const result = await loginUser({
      email: validation.data.email,
      password: validation.data.password,
    });

    const cookieStore = await cookies();
    cookieStore.set('token', result.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
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
