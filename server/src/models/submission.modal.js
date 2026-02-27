const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ["javascript", "python", "java", "cpp"],
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Runtime Error",
        "Compilation Error",
        "Memory Limit Exceeded",
      ],
      index: true,
    },
    executionTime: {
      type: Number, // in milliseconds
      default: 0,
    },
    memoryUsed: {
      type: Number, // in MB
      default: 0,
    },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      required: true,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    testResults: [
      {
        testCaseIndex: Number,
        passed: Boolean,
        input: String,
        expectedOutput: String,
        actualOutput: String,
        executionTime: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Compound index for user's submissions on specific questions
submissionSchema.index({ userId: 1, questionId: 1, createdAt: -1 });

// Index for finding accepted submissions
submissionSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model("Submission", submissionSchema);
