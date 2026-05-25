import CardComponent from '@/app/components/card';
import { getCachedPaginatedProjects } from '@/server/services/project-services';
import Header from '../components/header';
import Pagination from '../components/pagination';

const PAGE_SIZE = 5;

type ProjectPageProps = {
  searchParams?: Promise<{ page?: string }> | { page?: string };
};

const ProjectPage = async ({ searchParams }: ProjectPageProps) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const requestedPage = Number(resolvedSearchParams?.page ?? '1');
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const projectResult = await getCachedPaginatedProjects(
    PAGE_SIZE,
    currentPage
  );
  const totalPages = projectResult.meta.totalPages;
  const totalItems = projectResult.meta.total;
  const paginatedProjects = projectResult.items;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6">
      <Header
        title="My Projects"
        description="A curated collection of web development and UI design work that I have completed with high dedication."
      />
      {!paginatedProjects.length ? (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Project data is not available yet.
          </p>
        </section>
      ) : (
        <>
          <CardComponent projects={paginatedProjects} priorityFirstImage />
          <Pagination
            page={currentPage}
            totalPage={totalPages}
            totalItems={totalItems}
            pageLabel={pageLabel}
            basePath="/projects"
          />
        </>
      )}
    </div>
  );
};

export default ProjectPage;
