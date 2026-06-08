import { Metadata } from 'next';
import CertificateForm from '../components/form/form';

export const metadata: Metadata = {
  title: 'Certificates - Create',
  description: 'Halaman Tambah Sertifikat | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Add Certificate</h1>
          <p className="text-muted-foreground text-sm">
            Fill the information below to create a new certificate
          </p>
        </div>
      </header>
      <CertificateForm />
    </div>
  );
}
