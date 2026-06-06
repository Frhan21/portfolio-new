import { useQueryCertificate } from '@/app/components/certificate/hooks/use-query-certificate';
import { useQueryProject } from '@/app/components/project/hooks/use-query-project';
import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { FileBadge, FolderGit2, Tag } from 'lucide-react';

export function useDashboardData() {
  // 1. Fetch data from existing hooks
  const { data: projectResponse, isLoading: loadingProjects } =
    useQueryProject();
  const { data: categoryResponse, isLoading: loadingCategories } =
    useQueryCategory();
  const { data: certificateResponse, isLoading: loadingCertificates } =
    useQueryCertificate();

  // 2. Extract total counts from paginated responses
  // projectResponse is PaginatedResult: { items, meta: { total, page, totalPages } }
  // categoryResponse and certificateResponse retain their TResponsePaginate wrapper shape
  const projects = projectResponse;
  const projectTotal = projectResponse?.meta?.total?.toString() ?? '0';
  const categories = categoryResponse;
  const certificates = certificateResponse;

  const isLoading = loadingProjects || loadingCategories || loadingCertificates;

  // Helper to get total count
  const getTotal = (data: { items?: unknown[] } | undefined) =>
    data?.items?.length?.toString() || '0';

  // 3. Format data structure specifically for StatCard components
  const statCards = [
    {
      title: 'Total Projects',
      value: projectTotal,
      icon: <FolderGit2 className="h-5 w-5 text-blue-600" />,
      iconBgColor: 'bg-blue-100',
    },
    {
      title: 'Total Certificates',
      value: getTotal(certificates),
      icon: <FileBadge className="h-5 w-5 text-green-600" />,
      iconBgColor: 'bg-green-100',
    },
    {
      title: 'Total Categories',
      value: getTotal(categories),
      icon: <Tag className="h-5 w-5 text-orange-600" />,
      iconBgColor: 'bg-orange-100',
    },
  ];

  return {
    statCards,
    isLoading,
    raw: {
      projects,
      categories,
      certificates,
    },
  };
}
