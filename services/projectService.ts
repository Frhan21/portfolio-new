import { Project } from '@/app/components/types/Model';

interface ProjectResponse {
  projects: Project[];
  total?: number;
  page?: number;
  totalPages?: number;
}

interface ProjectQueryParams {
  page?: number;
  limit?: number;
}

const API_BASE_PATH = '/api/v1/project';

// get Project
export const getProjects = async ({
  limit,
}: ProjectQueryParams = {}): Promise<ProjectResponse> => {
  const searchParams = new URLSearchParams();
  if (typeof limit === 'number' && !Number.isNaN(limit)) {
    searchParams.set('limit', limit.toString());
  }

  const url =
    searchParams.toString().length > 0
      ? `${API_BASE_PATH}?${searchParams.toString()}`
      : API_BASE_PATH;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data: ProjectResponse = await response.json();
  return {
    projects: data.projects ?? [],
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
  };
};

// Get Project by Id
export const getProjectsbyId = async (id: string) => {
  const url = `${API_BASE_PATH}/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch project by ID');
  }

  const data: Project = await res.json();
  return {
    status: res.status,
    project: data,
  };
};
