import LoginForm from "@/components/LoginForm";
import { Link } from "react-router";

export default function LoginScreen() {
  return (
    <main className="flex min-h-screen w-full bg-white">
      {/* ---Login Link--- */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3 group">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500 transition-colors">
          Are you a staff member?
        </span>
        <Link
          to="/staff-login"
          className="px-5 py-2 text-[11px] font-extrabold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-full transition-all uppercase tracking-tighter shadow-sm"
        >
          Click Here
        </Link>
      </div>

      {/* --- Left Side: Decorative Image (Hidden on mobile) --- */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-slate-100 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1536148935331-408321065b18?q=80&w=687&auto=format&fit=crop"
          alt="Coding WorkSpace"
          className="absolute inset-0 w-full h-full object-bottom object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
      </section>

      {/* --- Right Side: Form Section --- */}
      <section className="flex flex-1 items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-medium text-base">
              Enter your account details below to access your workspace.
            </p>
          </header>

          {/* Main Login Form */}
          <div className="bg-white">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
