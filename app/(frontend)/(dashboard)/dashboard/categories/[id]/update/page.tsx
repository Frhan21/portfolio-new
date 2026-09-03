import { getCategoryById } from '@/server/actions/category.actions';
import { notFound } from 'next/navigation';
import { CategoryForm } from '../../components/form/form';
import HeaderPage from '../../../../component/header-page';

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
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Update category"
        description="Rename this category wherever it is used in your portfolio."
      />
      <CategoryForm initialData={category} />
    </div>
  );
}
