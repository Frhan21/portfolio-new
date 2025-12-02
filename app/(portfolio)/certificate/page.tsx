"use client";

import { useState } from "react";
import Header from "../components/header";
import { certificates as dummyCertificates } from "../dummy";
import CertificateCard from "./components/card";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";

const PAGE_SIZE = 6;

const CertificatePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    items: paginatedProjects,
    totalItems,
    totalPages,
    endPage,
    startPage,
  } = paginate(dummyCertificates, currentPage, PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="mt-5 space-y-8 px-4 md:px-6">
        <Header
          title="License & Certification"
          description="Bukti kompetensi dan pembelajaran berkelanjutan dalam teknologi modern."
        />
        <CertificateCard certificates={paginatedProjects} />
        <Pagination
          page={currentPage}
          totalItems={totalItems}
          totalPage={totalPages}
          startPage={startPage}
          endPage={endPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CertificatePage;
