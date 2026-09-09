import { getCertificates } from '@/server/actions/certificate.actions';
import { useQuery } from '@tanstack/react-query';

export const useQueryCertificate = (limit: number = 6, page: number = 1) => {
  return useQuery({
    queryKey: ['certificates', limit, page],
    queryFn: () => getCertificates(limit, page),
  });
};
