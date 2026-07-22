'use client';

import { useState, useMemo } from 'react';
import { columns } from './column';
import { DataTable } from '@/components/ui/data-table';
import { useQueryProject } from '@/app/components/project/hooks/use-query-project';
import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Category } from '@/model/category';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProjectTable() {
  const {
    data: projectResponse,
    isLoading: isLoadingProjects,
    error,
  } = useQueryProject();
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

  const filters = (
    <>
      <Select value={activeCategory} onValueChange={setActiveCategory}>
        <SelectTrigger
          className="h-10 w-full rounded-xl bg-background sm:w-44"
          aria-label="Filter by category"
        >
          <Filter className="size-3.5" />
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="All">All categories</SelectItem>
          {categories.map((cat: Category) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) =>
          setSortOrder(value as 'asc' | 'desc' | 'none')
        }
      >
        <SelectTrigger
          className="h-10 w-full rounded-xl bg-background sm:w-44"
          aria-label="Sort by category"
        >
          <ArrowUpDown className="size-3.5" />
          <SelectValue placeholder="Default sort" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="none">Default sort</SelectItem>
          <SelectItem value="asc">Category (A-Z)</SelectItem>
          <SelectItem value="desc">Category (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <DataTable
      columns={columns}
      data={processedData}
      isLoading={isLoadingProjects}
      error={error}
      toolbar={filters}
      searchPlaceholder="Search loaded projects..."
      emptyMessage="No projects match the current filters."
    />
  );
}
