import { Metadata } from 'next';
import HeaderPage from '../../component/header-page';
import CertificateTable from './components/table/certificate-table';

export const metadata: Metadata = {
  title: 'Certificate',
  description: 'Halaman Sertifikat | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <HeaderPage
        title="Certificate"
        description="Kelola daftar sertifikat yang ditampilkan di halaman portfolio."
        url="/dashboard/certificates/create"
      />
      <div>
        <CertificateTable />
      </div>
    </div>
  );
}
