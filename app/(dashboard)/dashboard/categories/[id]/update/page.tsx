import { getCategoryById } from '@/server/actions/category.actions';
import { notFound } from 'next/navigation';
import { CategoryForm } from '../../components/form/form';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Update Category</h1>
          <p className="text-muted-foreground text-sm">
            Update the information below to modify the Category
          </p>
        </div>
      </header>
      <CategoryForm initialData={category} />
    </div>
  );
}
