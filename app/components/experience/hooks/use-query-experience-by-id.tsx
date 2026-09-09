'use client';

import { getExperienceById } from '@/server/actions/experience.actions';
import { useQuery } from '@tanstack/react-query';

export const useQueryExperienceById = (id: string) => {
  return useQuery({
    queryKey: ['experience', id],
    queryFn: () => getExperienceById(id),
    enabled: !!id,
  });
};
