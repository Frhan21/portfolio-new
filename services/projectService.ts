import { Project } from "@/app/components/types/Model";

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

export interface ProjectPaginationResult {
  projects: Project[];
  total: number;
  page: number;
  totalPages: number;
}

const API_BASE_PATH = "/api/v1/project";


// get Project
export const getProjects = async ({
  page = 1,
  limit = 5,
}: ProjectQueryParams = {}): Promise<ProjectPaginationResult> => {
  const url = `${API_BASE_PATH}?page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data: ProjectResponse = await response.json();
  const projects = data.projects ?? [];
  const total = data.total ?? projects.length;
  const totalPages = data.totalPages ?? Math.max(1, Math.ceil(total / limit));
  const normalizedPage = data.page ?? page;

  return {
    projects,
    total,
    page: normalizedPage,
    totalPages,
  };
};
