'use client';

import { useEffect, useState } from 'react';
import Header from '../components/header';
// import { certificates as dummyCertificates } from '../dummy';
import CertificateCard from './components/card';
import { paginate } from '../utils/paginate';
import Pagination from '../components/pagination';
import { Certificate } from '@/model/Certificate';
import { getCertificates } from '@/services/certificateServices';
import LoadingSpinner from '@/app/dashboard/components/LoadingSpinner';

const PAGE_SIZE = 6;

const CertificatePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const { data: fetchedCertificates } = await getCertificates();
        setCertificates(fetchedCertificates);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchCertificates();
  }, []);

  const {
    items: paginatedCertificates,
    totalItems,
    totalPages,
    endPage,
    startPage,
  } = paginate(certificates, currentPage, PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const renderContent = () => {
    if (loading) {
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
