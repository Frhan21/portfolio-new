import { useMutation } from '@tanstack/react-query';
import { loginAction } from '@/server/actions/auth.actions';
import { LoginSchemaType } from '../component/form/schema/login-scheme';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const response = await loginAction(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};
