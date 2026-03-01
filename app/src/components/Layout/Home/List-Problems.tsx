import ProblemCard from "@/components/ProblemCard";
import { useLoaderData } from "react-router";

export default function ListProblems() {
  const CATEGORIES = [];
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <ProblemCard
            key={cat.name}
            category={cat.name}
            problemCount={cat.count}
            solvedCount={cat.solved}
          />
        ))}
      </div>
    </section>
  );
}
