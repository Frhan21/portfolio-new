import CardComponent from '@/app/components/card';
import { getCachedProjects } from '@/server/queries';
import Header from '../components/header';
import Pagination from '../components/pagination';

const PAGE_SIZE = 6;

type ProjectPageProps = {
  searchParams: Promise<{ page?: string }>;
};

const ProjectPage = async ({ searchParams }: ProjectPageProps) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const { items, meta } = await getCachedProjects(PAGE_SIZE, currentPage);

  const startItem = meta.total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, meta.total);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6 mb-20">
      <Header
        title="My Projects"
        description="A curated collection of web development and UI design work that I have completed with high dedication."
      />
      {items.length === 0 ? (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Project data is not available yet.
          </p>
        </section>
      ) : (
        <>
          <CardComponent projects={items} priorityFirstImage />
          <Pagination
            page={currentPage}
            totalPage={meta.totalPages}
            totalItems={meta.total}
            pageLabel={pageLabel}
            basePath="/projects"
          />
        </>
      )}
    </div>
  );
};

export default ProjectPage;
