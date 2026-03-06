// API RESPONSE TYPES
export interface ApiResponse<T> {
  status: string;
  results?: number;
  question: T;
  message?: string;
}

export interface PaginatedApiResponse<T> {
  status: string;
  results: number;
  totalPages?: number;
  currentPage?: number;
  questions: T;
  message?: string;
}

export interface QuestionFilters {
  page?: number;
  limit?: number;
  difficulty?: "Easy" | "Intermediate" | "Hard";
  category?: string;
  tags?: string[];
  isActive?: boolean;
  search?: string;
}
