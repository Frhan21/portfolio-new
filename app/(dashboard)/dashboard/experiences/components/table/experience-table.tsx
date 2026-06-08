'use client';

import { useQueryExperience } from '@/app/components/experience/hooks/use-query-experience';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';

export default function ExperienceTable() {
  const { data: experiences, isLoading } = useQueryExperience();

  return (
    <div className="bg-background border border-border shadow-sm overflow-hidden">
      <DataTable
        columns={columns}
        data={experiences?.items || []}
        isLoading={isLoading}
        emptyMessage="Data belum ditambahkan"
      />
    </div>
  );
}
