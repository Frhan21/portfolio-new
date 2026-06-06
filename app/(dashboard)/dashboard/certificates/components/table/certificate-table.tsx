'use client';

import { DataTable } from '@/components/ui/data-table';
import { useQueryCertificate } from '@/app/components/certificate/hooks/use-query-certificate';
import { columns } from './column';

export default function CertificateTable() {
  const { data: certificates, isLoading } = useQueryCertificate();

  return (
    <div className="flex flex-col space-y-4">
      {/* Table Container */}
      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={certificates?.items || []}
          isLoading={isLoading}
          emptyMessage="Data belum ditambahkan"
        />
      </div>
    </div>
  );
}
