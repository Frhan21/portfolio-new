import { Metadata } from 'next';
import HeaderPage from '../../component/header-page';
import ExperienceTable from './components/table/experience-table';

export const metadata: Metadata = {
  title: 'Experiences',
  description: 'Halaman Experiences | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Experiences"
        description="Kelola daftar pengalaman kerja yang ditampilkan di halaman portfolio."
        url="/dashboard/experiences/create"
        actionLabel="Add experience"
      />
      <ExperienceTable />
    </div>
  );
}
