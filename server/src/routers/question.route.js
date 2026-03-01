import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  hardDeleteQuestion,
} from "../controllers/question.controller.js";

import { createQuestionValidator } from "../validators/question.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

/**
 * @route   POST /api/questions
 * @desc    Create a new question
 * @access  Private (admin)
 */
router.post("/", createQuestionValidator, validate, createQuestion);

/**
 * @route   GET /api/questions
 * @desc    Get all questions (supports filters and pagination)
 * @access  Public
 */
router.get("/", getAllQuestions);

/**
 * @route   GET /api/questions/:id
 * @desc    Get question by ID
 * @access  Public
 */
router.get("/:id", getQuestionById);

/**
 * @route   PATCH /api/questions/:id
 * @desc    Update a question
 * @access  Private (admin)
 */
router.patch(
  "/:id",
  createQuestionValidator, // can use separate update validator if needed
  validate,
  updateQuestion,
);

/**
 * @route   DELETE /api/questions/:id
 * @desc    Soft delete a question (mark isActive = false)
 * @access  Private (admin)
 */
router.delete("/:id", deleteQuestion);

/**
 * @route   DELETE /api/questions/:id/hard
 * @desc    Hard delete a question permanently
 * @access  Private (admin)
 */
router.delete("/:id/hard", hardDeleteQuestion);

export default router;
