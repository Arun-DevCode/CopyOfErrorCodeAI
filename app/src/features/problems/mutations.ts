import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  hardDeleteQuestion,
} from "./api";

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

// Mutation: create question
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
};

// Mutation: update question
export const useUpdateQuestion = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof updateQuestion>[1]) =>
      updateQuestion(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: questionKeys.detail(id) });
    },
  });
};

// Mutation: soft delete question
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
};

// Mutation: hard delete question
export const useHardDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hardDeleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
};
