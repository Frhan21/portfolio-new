import { CategoryForm } from '../components/form/form';
import { Metadata } from 'next';
import HeaderPage from '../../../component/header-page';

export const metadata: Metadata = {
  title: 'Categories - Create',
  description: 'Halaman Tambah Kategori | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Create category"
        description="Add a category to organize projects and certificates."
      />
      <CategoryForm />
    </div>
  );
}
