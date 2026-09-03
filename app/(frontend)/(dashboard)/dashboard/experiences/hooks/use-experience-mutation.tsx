'use client';

import {
  addExperience,
  updateExperience,
} from '@/server/actions/experience.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseExperienceMutationProps {
  isEdit: boolean;
  experienceId?: string;
}

export const useExperienceMutation = ({
  isEdit,
  experienceId,
}: UseExperienceMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEdit) {
        if (!experienceId) throw new Error('Experience ID is required');
        const result = await updateExperience(experienceId, formData);
        if (!result.success) throw new Error(result.error);
        return result.data;
      }

      const result = await addExperience(formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['experiences'] }),
        experienceId
          ? queryClient.invalidateQueries({
              queryKey: ['experience', experienceId],
            })
          : Promise.resolve(),
      ]);
    },
  });
};
