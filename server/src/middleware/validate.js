// middleware/validate.middleware.js
import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // group errors by location (body, params, query)
    const groupedErrors = errors.array().reduce((acc, error) => {
      const location = error.location || "body";

      if (!acc[location]) acc[location] = {};

      acc[location][error.path] = error.msg;

      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: groupedErrors,
    });
  }

  next();
};

export default validate;
