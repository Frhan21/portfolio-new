import { Metadata } from 'next';
import HeaderPage from '../../../component/header-page';
import CertificateForm from '../components/form/form';

export const metadata: Metadata = {
  title: 'Certificates - Create',
  description: 'Halaman Tambah Sertifikat | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Create certificate"
        description="Add a certificate and its issuing details to your portfolio."
      />
      <CertificateForm />
    </div>
  );
}
