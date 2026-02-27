import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Account from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import cookieOptions from "../utils/cookieOptions.js";
import { matchedData } from "express-validator";
import sendEmail from "../services/email.services.js";

//  @route      POST /api/auth/user/signup
//  @controller createUserAccount
//  @model      Account
//  @access     Public

export const createUserAccount = catchAsync(async (req, res, next) => {
  const { username, email, password } = matchedData(req);

  // Check if email already exists
  const existingEmail = await Account.findOne({ email });
  if (existingEmail) {
    return next(new AppError("Email is already registered", 409));
  }

  // Check if username already exists
  const existingUsername = await Account.findOne({ username });
  if (existingUsername) {
    return next(new AppError("Username is already taken", 409));
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Sending : Onboarding email + Validation Res
  const messageId = await sendEmail(
    { username, password, email },
    process.env.ONBOARDING_CLIENT_URL,
  );
  console.log(messageId);
  if (!messageId) {
    new AppError("Failed to sent a email!", 500);
  }

  // Create user
  const user = await Account.create({
    username,
    email,
    password: hashedPassword,
  });

  // Send response
  res.status(201).json({
    success: true,
    message: "Account created and email sent.",
    data: {
      user: {
        username: user.username,
        email: user.email,
        onboardingId: messageId,
      },
    },
  });
});

//  @route      POST /api/auth/user/login
//  @controller userLogin
//  @access     Public

export const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.validatedData;

  // Find user by email
  const user = await Account.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Check if account is active
  if (!user.isActive) {
    return next(
      new AppError(
        "Your account has been deactivated. Please contact support.",
        403,
      ),
    );
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Generate token
  const token = generateToken(user._id);

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Set token in HTTP-only cookie
  res.cookie("accessToken", token, cookieOptions);

  // Remove password from response
  user.password = undefined;

  // Send response
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      user: {
        username: user.username,
        email: user.email,
      },
    },
  });
});

//  @route      POST /api/auth/user/logout
//  @controller userLogout
//  @access     Private

export const userLogout = catchAsync(async (req, res, next) => {
  //Clear the cookie by setting maxAge to 0
  res.cookie("accessToken", "", {
    ...cookieOptions,
    maxAge: 0,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
