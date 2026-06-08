'use client';

import { getExperiences } from '@/server/actions/experience.actions';
import { useQuery } from '@tanstack/react-query';

export const useQueryExperience = (limit: number = 10, page: number = 1) => {
  return useQuery({
    queryKey: ['experiences', limit, page],
    queryFn: () => getExperiences(limit, page),
  });
};
