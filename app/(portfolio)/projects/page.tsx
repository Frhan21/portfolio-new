'use client';

import CardComponent from '@/app/components/card';
import { projects as dummyProjects } from '../dummy';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import { paginate } from '../utils/paginate';
import Pagination from '../components/pagination';
import { Project } from '@/model/Project';
import { getProjects } from '@/services/projectService';
import LoadingSpinner from '@/app/dashboard/components/LoadingSpinner';

const PAGE_SIZE = 5;

const ProjectPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const { projects: fetchedProjects } = await getProjects({
          limit: PAGE_SIZE,
        });
        setProjects(fetchedProjects);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const {
    items: paginatedProjects,
    totalItems,
    totalPages,
    endPage,
    startPage,
  } = paginate(projects, currentPage, PAGE_SIZE);

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
