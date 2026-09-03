import { Metadata } from 'next';
import HeaderPage from '../../../../component/header-page';
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
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Update certificate"
        description="Review and update this certificate's details and image."
      />
      <CertificateForm initialData={certificate} />
    </div>
  );
}
