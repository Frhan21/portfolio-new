'use client';

import CardComponent from '@/app/components/card';
import { useQueryProject } from '@/app/components/project/hooks/use-query-project';
import LoadingSpinner from '@/app/dashboard/components/LoadingSpinner';
import { useState } from 'react';
import Header from '../components/header';
import Pagination from '../components/pagination';

const PAGE_SIZE = 5;

const ProjectPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const projectQuery = useQueryProject(PAGE_SIZE, currentPage);

  const totalPages = projectQuery.data?.data.meta.totalPages ?? 0;
  const totalItems = projectQuery.data?.data.meta.total ?? 0;
  const paginatedProjects = projectQuery.data?.data.items ?? [];
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
    if (projectQuery.isLoading) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center">
          <LoadingSpinner size={64} />
        </section>
      );
    }

    if (!paginatedProjects.length) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600">Data proyek belum tersedia.</p>
        </section>
      );
    }

    return (
      <>
        <CardComponent projects={paginatedProjects} />
        <Pagination
          page={currentPage}
          totalPage={totalPages}
          totalItems={totalItems}
          endPage={endPage}
          startPage={startPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6">
      <Header
        title="My Projects"
        description="Koleksi terpilih dari pekerjaan pengembangan web dan desain UI yang
        telah saya selesaikan dengan dedikasi tinggi."
      />
      {renderContent()}
    </div>
  );
};

export default ProjectPage;
