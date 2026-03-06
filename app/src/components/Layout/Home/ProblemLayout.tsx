import ListProblems from "./ListCategory";
import { Suspense } from "react";

// A quick Skeleton loader for a smoother UX
const ProblemSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-20 bg-gray-200 rounded-xl w-full" />
    ))}
  </div>
);

export default function Problem() {
  return (
    <main className="min-h-screen text-slate-900">
      <div className="px-6 py-12 lg:px-12">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 mb-3">
            Explore <span className="text-indigo-600">Coding</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg">
            Master your craft with our curated set of challenges. Level up your
            logic, one line at a time.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <section className="flex-1">
            <div className="rounded-2xl">
              <Suspense fallback={<ProblemSkeleton />}>
                <ListProblems />
              </Suspense>
            </div>
          </section>

          {/* Sidebar: Recommendations */}
          <aside className="lg:w-80 flex flex-col gap-6">
            <div className="p-6 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <h2 className="text-xl font-semibold mb-3">Weekly Pick</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                Based on your interest in Data Structures, we recommend trying
                "Advanced Tree Traversal."
              </p>
              <button className="w-full py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Try Now
              </button>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl">
              <h3 className="font-semibold mb-2">Platform Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Solved</span>
                  <span className="font-mono font-medium">12/450</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[5%]" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
