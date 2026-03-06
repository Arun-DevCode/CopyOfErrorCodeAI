// import ProblemDataTable from "@/components/Layout/Problem/ProblemTable";
import { useQuestionsByCategory } from "@/features/problems/queries";
import { useParams } from "react-router";

export default function ProblemScreen() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data, isLoading, isError, error } = useQuestionsByCategory(
    categoryId!,
  );

  // loading Screen
  if (isLoading) {
    return <h1>Loading categories...</h1>;
  }

  // Error Screen
  if (isError) {
    return (
      <h1>
        {error instanceof Error ? error.message : "Failed to get categories"}
      </h1>
    );
  }
  console.log(data);
  return (
    <div>{/* <ProblemDataTable data={data} loading={isLoading} /> */}</div>
  );
}
