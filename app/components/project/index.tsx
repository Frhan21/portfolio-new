'use client';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/app/dashboard/components/LoadingSpinner';
import { getProjects } from '@/services/projectService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CardComponent from '../card';
import { Project as ProjectModel } from '../types/Model';

const PAGE_SIZE = 3;

const Project = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
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
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan saat memuat proyek.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center">
          <LoadingSpinner size={64} />
        </section>
      );
    }

    if (error) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-red-500">Terjadi kesalahan:</p>
          <p className="text-gray-600">{error}</p>
        </section>
      );
    }

    if (!projects.length) {
      return (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-gray-600">Data proyek belum tersedia.</p>
        </section>
      );
    }

    return <CardComponent projects={projects} />;
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-fit mt-20 md:px-12 px-4 mx-auto"
      id="portfolio"
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-2 text-center md:text-left">
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-1 bg-orange-500" />
            <span className="text-xl tracking-wider">My Favorite Tools</span>
          </div>
          <span className="text-3xl md:text-4xl text-black font-bold">
            My Latest <span className="text-orange-500">Project</span>
          </span>
        </div>
        <Button
          className="mt-4 md:mt-0 px-5 py-3 md:py-6 rounded-full bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
          asChild
        >
          <Link href="/projects">See all projects</Link>
        </Button>
      </div>
      {/* Card Section */}
      <div className="my-16 w-full">{renderContent()}</div>
    </div>
  );
};

export default Project;
