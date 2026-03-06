export type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type TestCase = {
  input: string;
  output: string;
  isHidden?: boolean;
};

export type Difficulty = "Easy" | "Intermediate" | "Hard";

export type Question = {
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string; // ObjectId → string
  tags: string[];
  constraints: string;
  examples: Example[];
  testCases: TestCase[];
  timeLimit: number;
  memoryLimit: number;
  starterCode: Record<string, string>; // Map<string,string>
  hints: string[];
  solution?: string;
  createdBy: string;
  isActive: boolean;
  solvedCount: number;
  attemptedCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProblemSummary = Pick<
  Question,
  | "title"
  | "difficulty"
  | "category"
  | "tags"
  | "solvedCount"
  | "attemptedCount"
  | "isActive"
>;