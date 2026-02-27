import QuestionModel from "../models/question.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const createQuestion = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("Request body cannot be empty", 400));
  }

  const question = await QuestionModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: question,
  });
});

export const getAllQuestions = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    difficulty,
    category,
    tags,
    isActive = true,
  } = req.query;

  const filter = { isActive };

  if (difficulty) filter.difficulty = difficulty;
  if (category) filter.category = category;
  if (tags) filter.tags = { $in: tags.split(",") };

  const skip = (page - 1) * limit;

  const [questions, total] = await Promise.all([
    QuestionModel.find(filter)
      .select("-solution -testCases.expectedOutput")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    QuestionModel.countDocuments(filter),
  ]);

  res.status(200).json({
    status: "success",
    results: questions.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: questions,
  });
});

export const getQuestionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const question = await QuestionModel.findById(id).select(
    "-solution -testCases.expectedOutput",
  );

  if (!question) {
    return next(new AppError("Question not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: question,
  });
});

export const updateQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("Update payload cannot be empty", 400));
  }

  const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedQuestion) {
    return next(new AppError("Question not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedQuestion,
  });
});

export const deleteQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const question = await QuestionModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );

  if (!question) {
    return next(new AppError("Question not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Question deleted successfully",
  });
});

export const hardDeleteQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const question = await QuestionModel.findByIdAndDelete(id);

  if (!question) {
    return next(new AppError("Question not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Question permanently deleted",
  });
});
