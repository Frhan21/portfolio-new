'use client';

import { addProject, updateProject } from '@/server/actions/project.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseProjectMutationProps {
  isEdit: boolean;
  projectId?: string;
}

export const useProjectMutation = ({
  isEdit,
  projectId,
}: UseProjectMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEdit) {
        if (!projectId) throw new Error('Project ID is required');
        const result = await updateProject(projectId, formData);
        if (!result.success) throw new Error(result.error);
        return result.data;
      }

      const result = await addProject(formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['projects'] }),
        projectId
          ? queryClient.invalidateQueries({ queryKey: ['project', projectId] })
          : Promise.resolve(),
      ]);
    },
  });
};
