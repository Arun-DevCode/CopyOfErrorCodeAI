// utils/ErrorHandler.ts
const handleError = (error: unknown): never => {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error("Unknown error occurred");
};

export default handleError;
