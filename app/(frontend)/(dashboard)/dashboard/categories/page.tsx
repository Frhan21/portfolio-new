import { Metadata } from 'next';
import HeaderPage from '../../component/header-page';
import CategoryTable from './components/table/category-table';

export const metadata: Metadata = {
  title: 'Category',
  description: 'Category Page',
};

export default function Page() {
  return (
    <div className="space-y-7">
      <HeaderPage
        eyebrow="Content structure"
        title="Categories"
        description="Kelola daftar kategori yang akan ditampilkan di halaman portfolio."
        url="/dashboard/categories/create"
        actionLabel="Add category"
      />
      <CategoryTable />
    </div>
  );
}
