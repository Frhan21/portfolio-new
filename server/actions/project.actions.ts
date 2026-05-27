import { axiosInstance } from '@/lib/axios';
import {
  CreateProjectInput,
  TProjectResponse,
  TProjectResponses,
  UpdateProjectInput,
} from '@/model/project';
import axios from 'axios';

const API_BASE_PATH = '/project';

export const getProjects = async (
  limit: number,
  page: number = 1
): Promise<TProjectResponses> => {
  try {
    const searchParams = new URLSearchParams();
    if (typeof limit === 'number' && !Number.isNaN(limit)) {
      searchParams.set('limit', limit.toString());
    }
    if (typeof page === 'number' && !Number.isNaN(page)) {
      searchParams.set('page', page.toString());
    }

    const url =
      searchParams.toString().length > 0
        ? `${API_BASE_PATH}?${searchParams.toString()}`
        : API_BASE_PATH;

    const response = await axiosInstance.get(url);
    return {
      status_code: response.status,
      message: response.statusText,
      data: {
        items: response.data.data,
        meta: {
          total: response.data.total,
          page: response.data.page,
          totalPages: response.data.totalPages,
        },
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};

export const getProjectById = async (id: string): Promise<TProjectResponse> => {
  if (!id) throw new Error('Project ID is required');
  try {
    const response = await axiosInstance.get(`${API_BASE_PATH}/${id}`);
    return {
      status_code: response.status,
      message: response.statusText,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};

export const addProject = async (
  data: CreateProjectInput
): Promise<TProjectResponse> => {
  if (!data || !data.title) {
    throw new Error('Project data and title are required');
  }
  try {
    const response = await axiosInstance.post(`${API_BASE_PATH}`, data);
    return {
      status_code: response.status,
      message: response.statusText,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};

export const updateProject = async (
  id: string,
  data: UpdateProjectInput
): Promise<TProjectResponse> => {
  if (!id) throw new Error('Project ID is required for update');
  if (!data || Object.keys(data).length === 0) {
    throw new Error('Update data cannot be empty');
  }
  try {
    const response = await axiosInstance.patch(`${API_BASE_PATH}/${id}`, data);
    return {
      status_code: response.status,
      message: response.statusText,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};

export const deleteProject = async (
  id: string
): Promise<{ status_code: number; message: string; data: unknown }> => {
  if (!id) throw new Error('Project ID is required for deletion');
  try {
    const response = await axiosInstance.delete(`${API_BASE_PATH}/${id}`);
    return {
      status_code: response.status,
      message: response.statusText,
      data: response.data?.data ?? null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};
