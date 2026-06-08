import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { LoginSchemaType } from '../component/form/schema/login-scheme';
import { redirect } from 'next/navigation';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Invalid email or password');
      }

      return { success: true, message: 'Login successful' };
    },
  });
};
