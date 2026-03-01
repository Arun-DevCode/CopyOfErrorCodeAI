import mongoose from "mongoose";

// Import Schema
import testCaseSchema from "./testCase.model.js";

/* ---------------- Question Schema ---------------- */
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: [true, "Question description is required"],
    },

    difficulty: {
      type: String,
      enum: {
        values: ["Easy", "Intermediate", "Hard"],
        message: "Difficulty must be Easy, Intermediate, or Hard",
      },
      required: true,
    },

    // NORMALIZED
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one tag is required",
      },
    },

    constraints: {
      type: String,
      default:
        "• 1 ≤ n ≤ 10⁵\n• Input size fits within memory limits\n• Time complexity should be optimized",
    },
    examples: [
      {
        input: { type: String },
        output: { type: String },
        explanation: { type: String },
      },
    ],

    testCases: {
      type: [testCaseSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one test case is required",
      },
    },

    timeLimit: {
      type: Number,
      default: 2000,
      min: 100,
      max: 10000,
    },

    memoryLimit: {
      type: Number,
      default: 128,
      min: 16,
      max: 512,
    },

    // Scalable starter code
    starterCode: {
      type: Map,
      of: String,
      default: {},
    },

    hints: {
      type: [String],
      default: [],
    },

    solution: {
      type: String,
      select: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    solvedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    attemptedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

/* ---------------- Indexes ---------------- */
questionSchema.index({ difficulty: 1 });
questionSchema.index({ category: 1, difficulty: 1 });
questionSchema.index({ tags: 1 });

export default mongoose.model("Question", questionSchema);
