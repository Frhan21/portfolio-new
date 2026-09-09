'use client';

import Header from '../components/header';
import Pagination from '../components/pagination';
import CertificateCard from './components/card';
import { useQueryCertificate } from '@/app/components/certificate/hooks/use-query-certificate';
import { CertificateCardSkeleton } from './components/certificate-skeleton';
import { use } from 'react';

const PAGE_SIZE = 6;

type CertificatePageProps = {
  searchParams?: Promise<{ page?: string }> | { page?: string };
};

const CertificatePage = ({ searchParams }: CertificatePageProps) => {
  const resolvedSearchParams =
    searchParams instanceof Promise ? use(searchParams) : searchParams;
  const requestedPage = Number(resolvedSearchParams?.page ?? '1');
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const { data, isLoading, isError } = useQueryCertificate(
    PAGE_SIZE,
    currentPage
  );

  const totalPages = data?.meta.totalPages ?? 1;
  const totalItems = data?.meta.total ?? 0;
  const paginatedCertificates = data?.items ?? [];
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6 mb-20">
      <Header
        title="License & Certification"
        description="Proof of competency and continuous learning in modern technologies."
      />
      {isLoading ? (
        <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <CertificateCardSkeleton key={i} />
          ))}
        </div>
      ) : isError || !paginatedCertificates.length ? (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Certificate data is not available yet.
          </p>
        </section>
      ) : (
        <>
          <CertificateCard certificates={paginatedCertificates} />
          <Pagination
            page={currentPage}
            totalItems={totalItems}
            totalPage={totalPages}
            pageLabel={pageLabel}
            basePath="/certificate"
          />
        </>
      )}
    </div>
  );
};

export default CertificatePage;
