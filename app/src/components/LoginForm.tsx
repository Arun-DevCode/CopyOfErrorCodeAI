import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";

import { loginSchema, type LoginFormData } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field";

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Changed to onBlur for better UX (doesn't scream error while typing)
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Welcome back!");
      navigate("/dashboard");
      console.log("form submission:", data);
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    // Changed w-1/2 to w-full so it fills the max-w-md container
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      {/* Email Field */}
      <Field>
        <FieldLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Email Address
        </FieldLabel>
        <FieldContent>
          <FieldGroup
            className={`rounded-xl border transition-all mt-1.5 ${
              errors.email
                ? "border-red-200 bg-red-50"
                : "border-slate-100 bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"
            }`}
          >
            <Input
              type="email"
              placeholder="name@company.com"
              className="border-none bg-transparent shadow-none focus-visible:ring-0 h-12 text-slate-900 placeholder:text-slate-300"
              {...register("email")}
            />
          </FieldGroup>
          {errors.email && (
            <FieldError className="text-[11px] font-semibold text-red-500 mt-1 ml-1 tracking-tighter">
              {errors.email.message}
            </FieldError>
          )}
        </FieldContent>
      </Field>

      {/* Password Field */}
      <Field>
        <div className="flex justify-between items-center ml-1">
          <FieldLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Password
          </FieldLabel>
          <Link
            to="/forgot-password"
            className="font-bold text-blue-500 hover:text-blue-700 text-[10px] tracking-widest uppercase"
          >
            Forget Password?
          </Link>
        </div>
        <FieldContent>
          <FieldGroup
            className={`rounded-xl border transition-all mt-1.5 ${
              errors.password
                ? "border-red-200 bg-red-50"
                : "border-slate-100 bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"
            }`}
          >
            <Input
              type="password"
              placeholder="••••••••"
              className="border-none bg-transparent shadow-none focus-visible:ring-0 h-12 text-slate-900"
              {...register("password")}
            />
          </FieldGroup>
          {errors.password && (
            <FieldError className="text-[11px] font-semibold text-red-500 mt-1 ml-1 tracking-tighter">
              {errors.password.message}
            </FieldError>
          )}
        </FieldContent>
      </Field>

      {/* Remember Me */}
      <div className="flex items-center justify-between pt-1">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                id="remember"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-slate-200 data-[state=checked]:bg-blue-600 border-none"
              />
              <label
                htmlFor="remember"
                className="text-xs font-bold text-slate-500 cursor-pointer group-hover:text-slate-700 transition-colors"
              >
                REMEMBER ME
              </label>
            </div>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
      >
        {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
      </Button>
    </form>
  );
}
