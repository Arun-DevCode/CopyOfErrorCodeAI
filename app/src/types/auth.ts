import { z } from "zod";

// Reg Pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .toLowerCase()
    .regex(emailRegex, {
      message: "Please enter a valid email address (e.g., name@domain.com)",
    }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password is too long" })
    .regex(passwordRegex, {
      message:
        "Password must include uppercase, lowercase, a number, and a special character",
    }),

  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
