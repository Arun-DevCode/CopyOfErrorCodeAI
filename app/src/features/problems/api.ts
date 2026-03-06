import { type Question, type ProblemSummary } from "@/types/problem";
import api from "@/Services/apiClient";
import handleError from "@/utils/ErrorHandler";
import {
  type QuestionFilters,
  type PaginatedApiResponse,
  type ApiResponse,
} from "./types";

// Fetch all questions (with optional filters & pagination)
export const fetchQuestions = async (
  filters?: QuestionFilters,
): Promise<PaginatedApiResponse<ProblemSummary[]>> => {
  try {
    const { data } = await api.get<PaginatedApiResponse<ProblemSummary[]>>(
      "/v1/questions",
      { params: filters },
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Fetch single question by ID
export const fetchQuestionById = async (
  id: string,
): Promise<ApiResponse<Question>> => {
  try {
    const { data } = await api.get<ApiResponse<Question>>(
      `/v1/questions/${id}`,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Create a new question
export const createQuestion = async (
  payload: Omit<
    Question,
    "createdAt" | "updatedAt" | "solvedCount" | "attemptedCount"
  >,
): Promise<ApiResponse<Question>> => {
  try {
    const { data } = await api.post<ApiResponse<Question>>(
      "/v1/questions",
      payload,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Update a question (partial)
export const updateQuestion = async (
  id: string,
  payload: Partial<Question>,
): Promise<ApiResponse<Question>> => {
  try {
    const { data } = await api.patch<ApiResponse<Question>>(
      `/v1/questions/${id}`,
      payload,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Soft delete a question (sets isActive = false)
export const deleteQuestion = async (
  id: string,
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const { data } = await api.delete<ApiResponse<{ success: boolean }>>(
      `/v1/questions/${id}`,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

// Hard delete a question permanently
export const hardDeleteQuestion = async (
  id: string,
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const { data } = await api.delete<ApiResponse<{ success: boolean }>>(
      `/v1/questions/${id}/hard`,
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};
