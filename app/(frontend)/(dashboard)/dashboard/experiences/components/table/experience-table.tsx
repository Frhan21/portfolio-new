'use client';

import { useQueryExperience } from '@/app/components/experience/hooks/use-query-experience';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';

export default function ExperienceTable() {
  const { data: experiences, isLoading, error } = useQueryExperience();

  return (
    <DataTable
      columns={columns}
      data={experiences?.items || []}
      isLoading={isLoading}
      error={error}
      searchPlaceholder="Search loaded experiences..."
      emptyMessage="Add an experience to build your public timeline."
    />
  );
}
