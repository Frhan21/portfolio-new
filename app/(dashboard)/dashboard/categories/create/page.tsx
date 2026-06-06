import { CategoryForm } from '../components/form/form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories - Create',
  description: 'Halaman Tambah Kategori | Dashboard Portfolio',
};

export default function Page() {
  return (
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Add Category</h1>
          <p className="text-muted-foreground text-sm">
            Fill the information below to create a new category
          </p>
        </div>
      </header>
      <CategoryForm />
    </div>
  );
}
