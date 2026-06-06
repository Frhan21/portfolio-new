import { Metadata } from 'next';
import HeaderPage from '../../component/header-page';

export const metadata: Metadata = {
  title: 'Sertifikat',
  description: 'Halaman Sertifikat | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <HeaderPage
        title="Sertifikat"
        description="Kelola daftar sertifikat yang ditampilkan di halaman portfolio."
        url="/dashboard/certificates/create"
      />
    </div>
  );
}
