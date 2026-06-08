import { Certificate } from '@/model/certificate';
import {
  addCertificate,
  updateCertificate,
} from '@/server/actions/certificate.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CertificateMutationProps {
  isEdit: boolean;
  certificateId?: string;
}

export const useCertificateMutation = ({
  isEdit,
  certificateId,
}: CertificateMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEdit) {
        if (!certificateId) throw new Error('Certificate ID is required');
        const result = await updateCertificate(certificateId, formData);
        if (!result.success) throw new Error(result.error);
        return result.data;
      }

      const result = await addCertificate(formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['certificates'] }),
        certificateId
          ? queryClient.invalidateQueries({
              queryKey: ['certificate', certificateId],
            })
          : Promise.resolve(),
      ]);
    },
  });
};
