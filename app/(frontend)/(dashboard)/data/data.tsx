import { useQueryCertificate } from '@/app/components/certificate/hooks/use-query-certificate';
import { useQueryExperience } from '@/app/components/experience/hooks/use-query-experience';
import { useQueryProject } from '@/app/components/project/hooks/use-query-project';
import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { Briefcase, FileBadge, FolderGit2, Tag } from 'lucide-react';

export function useDashboardData() {
  // 1. Fetch data from existing hooks
  const {
    data: projectResponse,
    isLoading: loadingProjects,
    error: projectError,
  } = useQueryProject();
  const {
    data: categoryResponse,
    isLoading: loadingCategories,
    error: categoryError,
  } = useQueryCategory();
  const {
    data: certificateResponse,
    isLoading: loadingCertificates,
    error: certificateError,
  } = useQueryCertificate();
  const {
    data: experienceResponse,
    isLoading: loadingExperience,
    error: experienceError,
  } = useQueryExperience();

  // 2. Extract total counts from paginated responses
  // projectResponse is PaginatedResult: { items, meta: { total, page, totalPages } }
  // categoryResponse and certificateResponse retain their TResponsePaginate wrapper shape
  const projects = projectResponse;
  const projectTotal = projectResponse?.meta?.total?.toString() ?? '0';
  const categories = categoryResponse;
  const certificates = certificateResponse;
  const experiences = experienceResponse;

  const isLoading =
    loadingProjects ||
    loadingCategories ||
    loadingCertificates ||
    loadingExperience;

  // Helper to get total count
  const getTotal = (data: { items?: unknown[] } | undefined) =>
    data?.items?.length?.toString() || '0';

  // 3. Format data structure specifically for StatCard components
  const statCards = [
    {
      title: 'Total Projects',
      value: projectTotal,
      icon: <FolderGit2 className="h-5 w-5" />,
      href: '/dashboard/projects',
    },
    {
      title: 'Total Certificates',
      value: getTotal(certificates),
      icon: <FileBadge className="h-5 w-5" />,
      href: '/dashboard/certificates',
    },
    {
      title: 'Total Categories',
      value: getTotal(categories),
      icon: <Tag className="h-5 w-5" />,
      href: '/dashboard/categories',
    },
    {
      title: 'Total Experience',
      value: getTotal(experiences),
      icon: <Briefcase className="h-5 w-5" />,
      href: '/dashboard/experiences',
    },
  ];

  return {
    statCards,
    isLoading,
    error:
      projectError ||
      categoryError ||
      certificateError ||
      experienceError ||
      null,
    raw: {
      projects,
      categories,
      certificates,
      experiences,
    },
  };
}
