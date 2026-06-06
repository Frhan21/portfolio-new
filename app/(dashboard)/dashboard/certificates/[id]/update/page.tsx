import { Metadata } from 'next';
import CertificateForm from '../../components/form/form';
import { getCertificateById } from '@/server/actions/certificate.actions';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Certificates - Update',
  description: 'Update existing certificate',
};

// Next.js 15 App Router standard
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const certificate = await getCertificateById(id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Update Certificate</h1>
          <p className="text-muted-foreground text-sm">
            Update the information below to modify the certificate
          </p>
        </div>
      </header>
      <CertificateForm initialData={certificate} />
    </div>
  );
}
