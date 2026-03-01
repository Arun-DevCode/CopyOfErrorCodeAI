import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} from "../validators/category.validator.js";

import validate from "../middleware/validate.js";

const router = express.Router();

/* ---------------- Root: /categories ---------------- */
router
  .route("/")
  .get(getAllCategories)
  .post(createCategoryValidator, validate, createCategory);

/* ---------------- Single Category: /categories/:id ---------------- */
router
  .route("/:id")
  .get(categoryIdValidator, validate, getCategoryById)
  .patch(updateCategoryValidator, validate, updateCategory)
  .delete(categoryIdValidator, validate, deleteCategory);

export default router;
