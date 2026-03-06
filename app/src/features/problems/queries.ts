import { useQuery } from "@tanstack/react-query";
import { fetchQuestions, fetchQuestionById } from "./api";
import { type QuestionFilters } from "./types";

// Query Key definitions
export const questionKeys = {
  all: ["questions"] as const,
  lists: () => [...questionKeys.all, "list"] as const,
  list: (filters: QuestionFilters) =>
    [...questionKeys.lists(), filters] as const,
  byCategory: (categoryId: string) =>
    [...questionKeys.lists(), { category: categoryId }] as const,
  details: () => [...questionKeys.all, "detail"] as const,
  detail: (id: string) => [...questionKeys.details(), id] as const,
};

// Hook: get all questions (with optional filters)
export const useQuestions = (filters?: QuestionFilters) =>
  useQuery({
    queryKey: questionKeys.list(filters ?? {}),
    queryFn: () => fetchQuestions(filters),
  });

// Hook: get all questions by category ID
export const useQuestionsByCategory = (categoryId: string) =>
  useQuery({
    queryKey: questionKeys.byCategory(categoryId),
    queryFn: () => fetchQuestions({ category: categoryId }),
    enabled: !!categoryId,
  });

// Hook: get single question by ID
export const useQuestion = (id: string) =>
  useQuery({
    queryKey: questionKeys.detail(id),
    queryFn: () => fetchQuestionById(id),
    enabled: !!id,
  });
