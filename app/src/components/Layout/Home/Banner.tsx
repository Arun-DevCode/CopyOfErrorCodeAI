export default function Banner() {
  return (
    <div className="relative h-[40vh] w-full overflow-hidden">
      {/* The Image */}
      <img
        alt="Coding Work"
        fetchPriority="high"
        className="h-full w-full object-cover object-center"
        src="https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-transparent to-black/90"></div>
    </div>
  );
}
