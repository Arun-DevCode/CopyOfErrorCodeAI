import { Star } from "lucide-react";

export default function Navbar() {
  const logo = "{!}";
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <code className="font-bold text-white">{logo}</code>
          </div>
          <span className="text-xl font-bold text-slate-800">Error Code</span>
        </div>
        <div className="hidden items-center space-x-6 text-sm font-medium text-slate-500 md:flex">
          <a href="#" className="text-blue-600">
            Explore
          </a>
          <a href="#" className="hover:text-slate-800">
            Mentor Chat
          </a>
          <a href="#" className="hover:text-slate-800">
            Playground
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search challenges..."
            className="w-64 rounded-lg border border-gray-200 bg-slate-50 py-1.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-1 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
          <Star size={16}/>
          <span>15</span>
        </div>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-orange-100 ring-2 ring-white">
          <img
            src="https://ui-avatars.com/api/?name=User&background=fde6d2"
            alt="Profile"
          />
        </div>
      </div>
    </nav>
  );
}
