"use client";

import { Button } from "@/components/ui/button";
import CardComponent from "@/app/components/card";
import { projects as dummyProjects } from "../dummy";
import { useMemo, useState } from "react";
import Header from "../components/header";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";

const PAGE_SIZE = 5;

const ProjectPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    items: paginatedProjects,
    totalItems,
    totalPages,
    endPage,
    startPage,
  } = paginate(dummyProjects, currentPage, PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderContent = () => {
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
