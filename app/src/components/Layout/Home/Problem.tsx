import ListProblems from "./List-Problems";

export default function Problem() {
  return (
    <main className="max-w-[90%] mx-auto my-12 block sm:flex justify-between gap-24">
      <section className="flex-1">
        <div className="mb-12 w-1/2">
          <h1 className="text-4xl mb-5">Explore Coding</h1>
          <p>
            Practice coding problems and improve your problem-solving skills.
          </p>
        </div>

        <ListProblems />
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
