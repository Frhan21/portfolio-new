import { axiosInstance } from '@/lib/axios';
import axios from 'axios';
import {
  TCategoryResponse,
  TCategoryResponses,
  TCreateCategory,
  UpdateCategoryInput,
} from '@/model/category';

const API_BASE_PATH = '/category';

export const getCategories = async (
  limit?: number,
  page: number = 1
): Promise<TCategoryResponses> => {
  try {
    const searchParams = new URLSearchParams();
    if (
      limit !== undefined &&
      typeof limit === 'number' &&
      !Number.isNaN(limit)
    ) {
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

export const getCategoryById = async (
  id: string
): Promise<TCategoryResponse> => {
  if (!id) throw new Error('Category ID is required');
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

export const addCategory = async (
  data: TCreateCategory
): Promise<TCategoryResponse> => {
  if (!data || !data.title) {
    throw new Error('Category data and title are required');
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

export const updateCategory = async (
  id: string,
  data: UpdateCategoryInput
): Promise<TCategoryResponse> => {
  if (!id) throw new Error('Category ID is required for update');
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

export const deleteCategory = async (
  id: string
): Promise<{ status_code: number; message: string; data: unknown }> => {
  if (!id) throw new Error('Category ID is required for deletion');
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
