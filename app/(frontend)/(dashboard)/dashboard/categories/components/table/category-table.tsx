'use client';

import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';

export default function CategoryTable() {
  const {
    data: categories,
    isLoading: categoryLoading,
    error,
  } = useQueryCategory();

  return (
    <DataTable
      columns={columns}
      data={categories?.items || []}
      isLoading={categoryLoading}
      error={error}
      searchPlaceholder="Search loaded categories..."
      emptyMessage="Add a category to organize projects and certificates."
    />
  );
}
