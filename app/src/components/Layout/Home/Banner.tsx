import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
    title: "Build the Future with Code",
    description:
      "Master modern technologies and create powerful applications that shape the future of the web.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    title: "Craft Elegant Solutions",
    description:
      "Write clean, efficient code and transform complex problems into simple, scalable solutions.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
    title: "Collaborate & Innovate",
    description:
      "Join the global developer community and build amazing projects through open collaboration.",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            {/* Image */}
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Shader */}
            <div className="absolute inset-0 bg-linear-to-r from-neutral-900/90 via-transparent to-neutral-900/90 z-10"></div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 text-center text-white">
              <div className="w-full sm:max-w-5xl">
                <h2 className="text-balance text-5xl sm:text-8xl font-light mb-2.5">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-200">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="hidden absolute bottom-6 left-1/2 -translate-x-1/2 sm:flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
