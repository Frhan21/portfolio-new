import { addCategory, updateCategory } from '@/server/actions/category.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CategoryMutationProps {
  isEdit?: boolean;
  categoryId?: string;
}

export const useCategoryMutation = ({
  isEdit,
  categoryId,
}: CategoryMutationProps = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const title = formData.get('title') as string;

      if (isEdit && categoryId) {
        const result = await updateCategory(categoryId, { title });
        if (!result.success) throw new Error(result.error);
        return result.data;
      }

      const result = await addCategory({ title });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
};
