import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false, // Hidden test cases won't be shown to users
    },
  },
  { _id: false },
);

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Question description is required"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Intermediate", "Hard"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    constraints: {
      type: String,
      default: "",
    },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    testCases: [testCaseSchema],
    timeLimit: {
      type: Number,
      default: 2000, // milliseconds
      min: 100,
      max: 10000,
    },
    memoryLimit: {
      type: Number,
      default: 128, // MB
      min: 16,
      max: 512,
    },
    starterCode: {
      javascript: { type: String, default: "" },
      python: { type: String, default: "" },
      java: { type: String, default: "" },
      cpp: { type: String, default: "" },
    },
    hints: [
      {
        type: String,
      },
    ],
    solution: {
      type: String,
      select: false, // Don't return solution by default
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    solvedCount: {
      type: Number,
      default: 0,
    },
    attemptedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
questionSchema.index({ difficulty: 1, category: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ createdBy: 1 });

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;
