'use client';

import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';

export default function CategoryTable() {
  const { data: categories, isLoading: categoryLoading } = useQueryCategory();

  return (
    <div className="bg-background border border-border shadow-sm overflow-hidden">
      <DataTable
        columns={columns}
        data={categories?.items || []}
        isLoading={categoryLoading}
        emptyMessage="Data belum ditambahkan"
      />
    </div>
  );
}
