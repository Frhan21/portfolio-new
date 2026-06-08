'use client';

import CardComponent from '@/app/components/card';
import { useQueryProject } from '@/app/components/project/hooks/use-query-project';
import { ProjectCardSkeleton } from '@/app/components/project/project-skeleton';
import { use } from 'react';
import Header from '../components/header';
import Pagination from '../components/pagination';

const PAGE_SIZE = 5;

type ProjectPageProps = {
  searchParams?: Promise<{ page?: string }> | { page?: string };
};

const ProjectPage = ({ searchParams }: ProjectPageProps) => {
  const resolvedSearchParams =
    searchParams instanceof Promise ? use(searchParams) : searchParams;
  const requestedPage = Number(resolvedSearchParams?.page ?? '1');
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const { data, isLoading, isError } = useQueryProject(PAGE_SIZE, currentPage);

  const totalPages = data?.meta.totalPages ?? 1;
  const totalItems = data?.meta.total ?? 0;
  const paginatedProjects = data?.items ?? [];
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6 mb-20">
      <Header
        title="My Projects"
        description="A curated collection of web development and UI design work that I have completed with high dedication."
      />
      {isLoading ? (
        <div className="grid w-full gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : isError || !paginatedProjects.length ? (
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
