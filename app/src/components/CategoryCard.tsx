import { type Category } from "@/features/categories/types";
import { Terminal, Star, CheckCircle2, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router";

type ProblemCardProps = {
  categoryData: Category;
};

export default function CategoryCard({ categoryData }: ProblemCardProps) {
  const { name, slug, description, isActive, questionCount, _id } =
    categoryData;

  // Modern UI usually implies high-quality visuals
  const imageUrl = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&sig=${slug}`;

  return (
    <div className="group w-full max-w-90 bg-white rounded-[2.5rem] border border-slate-100 p-3 shadow-sm transition-all  hover:-translate-y-1">
      {/* 1. The Featured Image (Visual Anchor) */}
      <div className="relative h-60 w-full overflow-hidden rounded-[2rem]">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Top Status: Active Indicator */}
        {isActive && (
          <div className="absolute left-4 top-4">
            <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          </div>
        )}

        {/* Top Action: Save/Favorite */}
        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-indigo-600 transition-all">
          <Star size={18} />
        </button>
      </div>

      {/* 2. Problem Information */}
      <div className="px-4 pt-5 pb-2">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-slate-900 font-bold">
            <span className="text-amber-500">★</span> 4.9
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-4 line-clamp-1">
          {description}
        </p>

        <div className="flex items-center gap-4 text-slate-600 text-[13px] font-semibold mb-6 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-1.5">
            <Terminal size={16} className="text-slate-400" />
            <span>{questionCount} Challenges</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-slate-400" />
            <span>92% Success</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy size={16} className="text-slate-400" />
            <span>450 XP</span>
          </div>
        </div>

        {/* 4. The Action Footer */}
        <div className="flex">
          <Link
            to={`/${_id}/problems`}
            className="flex w-full text-center justify-center items-center gap-2 bg-indigo-800 text-white py-3 px-8 rounded-2xl font-bold transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 active:scale-95"
          >
            View Problems
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
