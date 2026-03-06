import ProblemCard from "@/components/CategoryCard";
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
    <section className="py-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
        {data?.category &&
          data.category?.map((cat: Category) => (
            <ProblemCard key={cat._id} categoryData={cat} />
          ))}
      </div>
    </section>
  );
}
