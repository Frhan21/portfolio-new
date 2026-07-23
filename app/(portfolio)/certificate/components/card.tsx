'use client';

import { Certificate } from '@/model/certificate';
import CertificateItem from '@/app/components/certificate/certificate-item';

interface CertificateProps {
  certificates: Certificate[];
}

const CertificateCard = ({ certificates }: CertificateProps) => {
  if (!certificates.length) {
    return (
      <section className="flex flex-col items-center justify-center text-center w-full py-16">
        <p className="text-gray-600 dark:text-gray-400">
          No certificates available to display.
        </p>
      </section>
    );
  }

  return (
    <div className="grid w-full gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
      {certificates.map((certificate) => (
        <CertificateItem
          key={certificate.id}
          cert={certificate}
          className="w-full"
        />
      ))}
    </div>
  );
};

export default CertificateCard;
