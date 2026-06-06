import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { registerAction } from '@/server/actions/auth.actions';
import { RegisterSchemaType } from '../component/form/schema/register-scheme';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const response = await registerAction(data);
      if (!response.success) {
        throw new Error(response.error);
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Auto-login failed after registration');
      }

      return response;
    },
  });
};
