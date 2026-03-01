import ProblemCard from "@/components/ProblemCard";
import { useCategories } from "@/features/categories/queries";
import { type Category } from "@/features/categories/types";

export default function ListProblems() {
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <h1>Loading categories...</h1>;
  }

  if (isError) {
    return (
      <h1>
        {error instanceof Error ? error.message : "Failed to get categories"}
      </h1>
    );
  }

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data?.category &&
          data.category?.map((cat: Category) => (
            <ProblemCard key={cat.slug} categoryData={cat} />
          ))}
      </div>
    </section>
  );
}
