import { getProjects } from '@/server/actions/project-actions';
import { useQuery } from '@tanstack/react-query';

export const useQueryProject = (limit: number = 3, page: number = 1) => {
  return useQuery({
    queryKey: ['projects', limit, page],
    queryFn: () => getProjects(limit, page),
  });
};
