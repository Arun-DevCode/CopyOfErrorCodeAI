// import React from 'react'
import { type Category } from "@/features/categories/types";

type ProblemCardProps = {
  categoryData: Category;
};

export default function ProblemCard({ categoryData }: ProblemCardProps) {
  const { name, slug, description, isActive, questionCount, createdAt } =
    categoryData;

  // Formatting the ISO date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Using a tech-themed random image from Unsplash seeded by the slug
  const imageUrl = `https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600&sig=${slug}`;

  return (
    <div className="group w-full max-w-xs relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Card Header Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Active Status Badge */}
        {isActive && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
              Live
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 ">
          <h3 className="text-lg font-bold text-slate-800 mb-1">{name}</h3>
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        <div className="w-full max-w-md flex items-center space-x-2.5">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-extralight text-indigo-700">
            {slug}
          </span>
        </div>
        {/* Footer Stats */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-50 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Questions
            </span>
            <span className="text-xl font-black text-slate-700">
              {questionCount}
            </span>
          </div>

          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Created
            </span>
            <span className="text-xs font-medium text-slate-500">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Action Overlay (Optional subtle touch) */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
