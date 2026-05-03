import Header from '../components/header';
import Pagination from '../components/pagination';
import CertificateCard from './components/card';
import { getCachedPaginatedCertificates } from '@/server/services/certificate-services';

const PAGE_SIZE = 6;

type CertificatePageProps = {
  searchParams?: Promise<{ page?: string }> | { page?: string };
};

const CertificatePage = async ({ searchParams }: CertificatePageProps) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const requestedPage = Number(resolvedSearchParams?.page ?? '1');
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const certificateResult = await getCachedPaginatedCertificates(
    PAGE_SIZE,
    currentPage
  );
  const totalPages = certificateResult.meta.totalPages;
  const totalItems = certificateResult.meta.total;
  const paginatedCertificates = certificateResult.items;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6">
      <Header
        title="License & Certification"
        description="Bukti kompetensi dan pembelajaran berkelanjutan dalam teknologi modern."
      />
      {!paginatedCertificates.length ? (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600">Data sertifikat belum tersedia.</p>
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
