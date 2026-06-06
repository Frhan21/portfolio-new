import { Metadata } from 'next';
import ProjectTable from './components/table/project-table';
import HeaderPage from '../../component/header-page';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Halaman Projects | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <HeaderPage
        title="Projects"
        description="Kelola daftar project yang ditampilkan di halaman portfolio."
        url="/dashboard/projects/create"
      />
      <ProjectTable />
    </div>
  );
}
