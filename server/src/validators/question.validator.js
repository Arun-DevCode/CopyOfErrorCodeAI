import { body } from "express-validator";

export const createQuestionValidator = [
  // Title
  body("title")
    .notEmpty()
    .withMessage("Question title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),

  // Description
  body("description")
    .notEmpty()
    .withMessage("Question description is required")
    .isString()
    .withMessage("Description must be a string"),

  // Difficulty
  body("difficulty")
    .notEmpty()
    .withMessage("Difficulty is required")
    .isIn(["Easy", "Intermediate", "Hard"])
    .withMessage("Difficulty must be Easy, Intermediate, or Hard"),

  // Category
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .trim(),

  // Tags
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("tags.*").optional().isString().withMessage("Each tag must be a string"),

  // Constraints
  body("constraints")
    .optional()
    .isString()
    .withMessage("Constraints must be a string"),

  // Examples
  body("examples")
    .optional()
    .isArray()
    .withMessage("Examples must be an array"),
  body("examples.*.input")
    .optional()
    .isString()
    .withMessage("Example input must be a string"),
  body("examples.*.output")
    .optional()
    .isString()
    .withMessage("Example output must be a string"),
  body("examples.*.explanation")
    .optional()
    .isString()
    .withMessage("Example explanation must be a string"),

  // Test Cases
  body("testCases")
    .notEmpty()
    .withMessage("At least one test case is required")
    .isArray({ min: 1 })
    .withMessage("Test cases must be an array"),

  body("testCases.*.input")
    .notEmpty()
    .withMessage("Test case input is required")
    .isString()
    .withMessage("Test case input must be a string"),

  body("testCases.*.expectedOutput")
    .notEmpty()
    .withMessage("Expected output is required")
    .isString()
    .withMessage("Expected output must be a string"),

  body("testCases.*.isHidden")
    .optional()
    .isBoolean()
    .withMessage("isHidden must be boolean"),

  // Time Limit
  body("timeLimit")
    .optional()
    .isInt({ min: 100, max: 10000 })
    .withMessage("Time limit must be between 100 and 10000 ms"),

  // Memory Limit
  body("memoryLimit")
    .optional()
    .isInt({ min: 16, max: 512 })
    .withMessage("Memory limit must be between 16 and 512 MB"),

  // Starter Code
  body("starterCode")
    .optional()
    .isObject()
    .withMessage("Starter code must be an object"),

  body("starterCode.javascript").optional().isString(),
  body("starterCode.python").optional().isString(),
  body("starterCode.java").optional().isString(),
  body("starterCode.cpp").optional().isString(),

  // Hints
  body("hints").optional().isArray().withMessage("Hints must be an array"),
  body("hints.*")
    .optional()
    .isString()
    .withMessage("Each hint must be a string"),

  // Solution
  body("solution")
    .optional()
    .isString()
    .withMessage("Solution must be a string"),

  // createdBy
  body("createdBy")
    .notEmpty()
    .withMessage("createdBy is required")
    .isMongoId()
    .withMessage("createdBy must be a valid MongoDB ObjectId"),

  // isActive
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];
