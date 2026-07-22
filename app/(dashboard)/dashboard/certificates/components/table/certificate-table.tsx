'use client';

import { DataTable } from '@/components/ui/data-table';
import { useQueryCertificate } from '@/app/components/certificate/hooks/use-query-certificate';
import { columns } from './column';

export default function CertificateTable() {
  const { data: certificates, isLoading, error } = useQueryCertificate();

  return (
    <DataTable
      columns={columns}
      data={certificates?.items || []}
      isLoading={isLoading}
      error={error}
      searchPlaceholder="Search loaded certificates..."
      emptyMessage="Add a certificate to publish it in your portfolio."
    />
  );
}
