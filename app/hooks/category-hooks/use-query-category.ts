import { getCategories } from '@/server/actions/category.actions';
import { useQuery } from '@tanstack/react-query';

export const useQueryCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
};
