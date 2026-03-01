import Category from "../models/category.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { matchedData } from "express-validator";

export const createCategory = catchAsync(async (req, res, next) => {
  const { name, description, slug } = matchedData(req);
  console.log(slug);
  const exists = await Category.findOne({ name });
  if (exists) {
    return next(new AppError("Category already exists", 409));
  }

  const category = await Category.create({ name, description, slug });

  res.status(201).json({
    status: "success",
    data: category,
  });
});

export const getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.aggregate([
    // 1. Filter for active categories
    { $match: { isActive: true } },

    // 2. Join with the Questions collection
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "category",
        as: "relatedQuestions",
      },
    },

    // 3. Add a field for the count
    {
      $addFields: {
        questionCount: { $size: "$relatedQuestions" },
      },
    },

    // 4. Remove the raw questions array
    {
      $project: {
        relatedQuestions: 0,
      },
    },

    // 5. Sort by name
    { $sort: { name: 1 } },
  ]);

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: categories,
  });
});

export const getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  Object.assign(category, req.body);
  await category.save();

  res.status(200).json({
    status: "success",
    data: category,
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  category.isActive = false;
  await category.save();

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
});
