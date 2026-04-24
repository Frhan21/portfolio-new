'use client';

import { useState } from 'react';
import Header from '../components/header';
import LoadingSpinner from '@/app/dashboard/components/LoadingSpinner';
import Pagination from '../components/pagination';
import CertificateCard from './components/card';
import { useQueryCertificate } from '@/app/components/certificate/hooks/use-query-certificate';

const PAGE_SIZE = 6;

const CertificatePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const certificateQuery = useQueryCertificate(PAGE_SIZE, currentPage);

  const totalPages = certificateQuery.data?.data.meta.totalPages ?? 0;
  const totalItems = certificateQuery.data?.data.meta.total ?? 0;
  const paginatedCertificates = certificateQuery.data?.data.items ?? [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const renderContent = () => {
    if (certificateQuery.isLoading) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center">
          <LoadingSpinner size={64} />
        </section>
      );
    }

    if (!paginatedCertificates.length) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600">Data sertifikat belum tersedia.</p>
        </section>
      );
    }

    return (
      <>
        <CertificateCard certificates={paginatedCertificates} />
        <Pagination
          page={currentPage}
          totalItems={totalItems}
          totalPage={totalPages}
          startPage={startPage}
          endPage={endPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <>
      <div className="mt-5 space-y-8 px-4 md:px-6">
        <Header
          title="License & Certification"
          description="Bukti kompetensi dan pembelajaran berkelanjutan dalam teknologi modern."
        />
        {renderContent()}
      </div>
    </>
  );
};

export default CertificatePage;
