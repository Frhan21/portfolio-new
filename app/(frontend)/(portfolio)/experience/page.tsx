import { getCachedExperiences } from '@/server/queries';
import Header from '../components/header';
import Pagination from '../components/pagination';
import ExperienceList from './experience-list';

const PAGE_SIZE = 10;

type ExperiencePageProps = {
  searchParams: Promise<{ page?: string }>;
};

const ExperiencePage = async ({ searchParams }: ExperiencePageProps) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const { items, meta } = await getCachedExperiences(PAGE_SIZE, currentPage);

  const startItem = meta.total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, meta.total);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6 mb-20">
      <Header
        title="Work Experience"
        description="Perjalanan karir profesional saya di industri teknologi."
      />
      {items.length === 0 ? (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Experience data is not available yet.
          </p>
        </section>
      ) : (
        <>
          <ExperienceList experiences={items} />
          <Pagination
            page={currentPage}
            totalPage={meta.totalPages}
            totalItems={meta.total}
            pageLabel={pageLabel}
            basePath="/experience"
          />
        </>
      )}
    </div>
  );
};

export default ExperiencePage;
