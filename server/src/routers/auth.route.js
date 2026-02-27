// routes/auth.routes.js
import { Router } from "express";
import validate from "../middleware/validate.js";
import {
  emailSignupRules,
  emailLoginRules,
} from "../validators/auth.validator.js";
// import {
//   userIdParamRules,
//   getUsersQueryRules,
//   updateProfileRules,
//   updateUserRoleRules,
// } from "../validators/auth.validator.js";
import * as authController from "../controllers/auth.controller.js";
// import * as userController from "../controllers/user.controller.js";

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
//  AUTH ROUTES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user account with email and password
 * @body    { username, email, password, confirmPassword }
 * @access  Public
 */
router.post(
  "/create-account",
  emailSignupRules,
  validate,
  authController.createUserAccount,
);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and set JWT token in HTTP-only cookie
 * @body    { email, password }
 * @access  Public
 */
router.post("/login", emailLoginRules, validate, authController.userLogin);

/**
 * @route   POST /api/auth/logout
 * @desc    Clear JWT cookie and log the user out
 * @access  Private
 */
router.post("/logout", authController.userLogout);

// ─────────────────────────────────────────────────────────────────────────────
//  USER ROUTES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @route   GET /api/auth/users
 * @desc    Retrieve a paginated list of all users with optional search and filter
 * @query   { page, limit, search, role }
 * @access  Private (Admin only)
 */
// router.get("/users", getUsersQueryRules, validate, userController.getUsers);

/**
 * @route   GET /api/auth/users/:id
 * @desc    Retrieve a single user by their MongoDB ID
 * @params  { id } - MongoDB ObjectId of the user
 * @access  Private
 */
// router.get("/users/:id", userIdParamRules, validate, userController.getUser);

/**
 * @route   PUT /api/auth/users/:id
 * @desc    Update a user's profile information (username, email, bio, profilePicture)
 * @params  { id } - MongoDB ObjectId of the user
 * @body    { username?, email?, bio?, profilePicture? }
 * @access  Private (Owner only)
 */
// router.put(
//   "/users/:id",
//   [...userIdParamRules, ...updateProfileRules],
//   validate,
//   userController.updateUser,
// );

/**
 * @route   PATCH /api/auth/users/:id/role
 * @desc    Update a user's role (user or admin)
 * @params  { id } - MongoDB ObjectId of the user
 * @body    { role } - "user" or "admin"
 * @access  Private (Admin only)
 */
// router.patch(
//   "/users/:id/role",
//   [...userIdParamRules, ...updateUserRoleRules],
//   validate,
//   userController.updateRole,
// );

/**
 * @route   DELETE /api/auth/users/:id
 * @desc    Permanently delete a user account by ID
 * @params  { id } - MongoDB ObjectId of the user
 * @access  Private (Admin only)
 */
// router.delete(
//   "/users/:id",
//   userIdParamRules,
//   validate,
//   userController.deleteUser,
// );

export default router;
