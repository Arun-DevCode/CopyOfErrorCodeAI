// validators/auth.validator.js
import { body, param, query } from "express-validator";

// ─── Reusable Field Rules ─────────────────────────────────────────────────────

const usernameRule = body("username")
  .notEmpty()
  .withMessage("Username is required")
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters")
  .isLength({ max: 30 })
  .withMessage("Username cannot exceed 30 characters")
  .trim();

const emailRule = body("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Please provide a valid email")
  .normalizeEmail()
  .trim();

const passwordRule = body("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");

const confirmPasswordRule = body("confirmPassword")
  .notEmpty()
  .withMessage("Confirm password is required")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  });

// ─── Auth Rules ───────────────────────────────────────────────────────────────

export const emailSignupRules = [
  usernameRule,
  emailRule,
  passwordRule,
  confirmPasswordRule,
];

export const emailLoginRules = [
  emailRule,
  body("password").notEmpty().withMessage("Password is required"),
];

export const oauthSignupRules = [
  usernameRule,
  emailRule,
  body("googleId")
    .optional()
    .isString()
    .withMessage("Google ID must be a string"),
  body("githubId")
    .optional()
    .isString()
    .withMessage("GitHub ID must be a string"),
  body("profilePicture")
    .optional()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),
];

export const forgotPasswordRules = [emailRule];

export const resetPasswordRules = [
  passwordRule,
  confirmPasswordRule,
  body("resetPasswordToken").notEmpty().withMessage("Reset token is required"),
];
