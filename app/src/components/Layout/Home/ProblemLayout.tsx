import ListProblems from "./List-Problems";
import { Suspense } from "react";

export default function Problem() {
  return (
    <main className="w-full px-12 py-12 block sm:flex justify-between gap-24 bg-gray-50">
      <section className="flex-1">
        <div className="mb-12 w-1/2">
          <h1 className="text-4xl mb-2">Explore Coding</h1>
          <p className="text-slate-600">
            Practice coding problems and improve your problem-solving skills.
          </p>
        </div>

        <Suspense fallback={<h1>Loading...</h1>}>
          <ListProblems />
        </Suspense>
      </section>

      <aside className="text-center w-1/4">
        <h2>Welcome to recommendation</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt,
          perferendis? Minus quia quasi esse inventore! Cum adipisci ab ea
          possimus quas voluptate. Consequuntur pariatur vero eius, eos ducimus
          magnam ratione!
        </p>
      </aside>
    </main>
  );
}
