import { useMutation } from '@tanstack/react-query';
import { registerAction } from '@/server/actions/auth.actions';
import { RegisterSchemaType } from '../component/form/schema/register-scheme';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const response = await registerAction(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};
