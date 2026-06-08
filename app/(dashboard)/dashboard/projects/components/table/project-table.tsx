'use client';

import { useState, useMemo } from 'react';
import { columns } from './column';
import { DataTable } from '@/components/ui/data-table';
import { useQueryProject } from '@/app/components/project/hooks/use-query-project';
import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Category } from '@/model/category';

export default function ProjectTable() {
  const { data: projectResponse, isLoading: isLoadingProjects } =
    useQueryProject();
  const { data: categoryResponse } = useQueryCategory();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  const projects = projectResponse?.items;
  const categories = categoryResponse?.items || [];

  const processedData = useMemo(() => {
    let result = projects ? [...projects] : [];

    // 1. Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(
        (project) =>
          project.category?.id === activeCategory ||
          project.category?.title === activeCategory
      );
    }

    // 2. Sort by Category Title
    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        const catA = a.category?.title || '';
        const catB = b.category?.title || '';
        if (sortOrder === 'asc') {
          return catA.localeCompare(catB);
        } else {
          return catB.localeCompare(catA);
        }
      });
    }

    return result;
  }, [projects, activeCategory, sortOrder]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Filters Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-md text-sm font-medium text-foreground shadow-sm hover:bg-muted">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-foreground"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-md text-sm font-medium text-foreground shadow-sm hover:bg-muted">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-foreground"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'asc' | 'desc' | 'none')
              }
            >
              <option value="none">Default Sort</option>
              <option value="asc">Category (A-Z)</option>
              <option value="desc">Category (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={processedData}
          isLoading={isLoadingProjects}
          emptyMessage="Data belum ditambahkan"
        />
      </div>
    </div>
  );
}
