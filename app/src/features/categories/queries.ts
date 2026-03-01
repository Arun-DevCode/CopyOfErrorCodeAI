import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryById } from "./api";

// Query Key definitions
export const categoryKeys = {
  all: ["categories"] as const,
  details: (id: string) => [...categoryKeys.all, "detail", id] as const,
};

// Hook: get all categories
export const useCategories = () =>
  useQuery({
    queryKey: categoryKeys.all,
    queryFn: fetchCategories,
  });

// Hook: get single category by id
export const useCategory = (id: string) =>
  useQuery({
    queryKey: categoryKeys.details(id),
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
  });
