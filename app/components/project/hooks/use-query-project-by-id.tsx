'use client';

import { getProjectById } from '@/server/actions/project.actions';
import { useQuery } from '@tanstack/react-query';

export const useQueryProjectById = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
};
