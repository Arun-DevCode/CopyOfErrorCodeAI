// utils/AppError.js

class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true; // distinguish operational vs programming errors
    this.errors = errors; // extra field for validation errors

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
