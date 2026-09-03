import { getCachedCertificates } from '@/server/queries';
import Header from '../components/header';
import Pagination from '../components/pagination';
import CertificateCard from './components/card';

const PAGE_SIZE = 6;

type CertificatePageProps = {
  searchParams: Promise<{ page?: string }>;
};

const CertificatePage = async ({ searchParams }: CertificatePageProps) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const { items, meta } = await getCachedCertificates(PAGE_SIZE, currentPage);

  const startItem = meta.total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, meta.total);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6 mb-20">
      <Header
        title="My Certificates"
        description="Sertifikasi yang saya peroleh sebagai bukti pembelajaran berkelanjutan di bidang teknologi."
      />
      <CertificateCard certificates={items} />
      <Pagination
        page={currentPage}
        totalPage={meta.totalPages}
        totalItems={meta.total}
        pageLabel={pageLabel}
        basePath="/certificate"
      />
    </div>
  );
};

export default CertificatePage;
