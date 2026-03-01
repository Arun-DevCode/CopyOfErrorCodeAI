import { type Category } from "@/features/categories/types";
import api from "@/Services/apiClient";
import handleError from "@/utils/ErrorHandler";

// API RESPONSE TYPE
// common API response wrapper
interface ApiResponse<T> {
  status: string;
  results?: number;
  category: T;
  message?: string;
}

// Fetch all categories
export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await api.get<ApiResponse<Category[]>>("/v1/category/");
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; 
  }
};

// Fetch single category
export const fetchCategoryById = async (
  id: string,
): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.get<ApiResponse<Category>>(
      `/v1/categories/${id}`,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Create category
export const createCategory = async (
  payload: Category,
): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.post<ApiResponse<Category>>(
      "/categories",
      payload,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Update category
export const updateCategory = async (
  id: string,
  payload: Partial<Category>,
): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.put<ApiResponse<Category>>(
      `/categories/${id}`,
      payload,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Delete category
export const deleteCategory = async (
  id: string,
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const { data } = await api.delete<ApiResponse<{ success: boolean }>>(
      `/categories/${id}`,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};
