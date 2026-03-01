import express from "express";
import cors from "cors";
import helmet from "helmet";
import { engine } from "express-handlebars";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

//Imports
import connectDB from "./src/config/db.config.js";

const app = express();
config({ path: "./.env.local", debug: true }); // env loader

// Import Routes
import authRoutes from "./src/routers/auth.route.js";
import categoryRoutes from "./src/routers/category.route.js";
import questionRoutes from "./src/routers/question.route.js";

// import userRoutes from "./src/routers/user.route.js";
// import featureRoutes from "./src/routers/features.route.js";
// import codeRoutes from "./src/routers/submission.route.js";
// import adminRoutes from "./src/routers/admin.route.js";
// import metricsRoutes from "./src/routers/metrics.route.js";
// import socialAuthRoutes from "./src/routers/socialAuth.route.js";

// Security Middleware
app.use(helmet()); // Set security headers
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs"); // View engine - HBS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit auth attempts
  message: "Too many authentication attempts, please try again later.",
});

app.use("/api/", limiter);
app.use("/api/auth/user/login", authLimiter);
app.use("/api/auth/user/signup", authLimiter);

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Data sanitization
// app.use(mongoSanitizer.);

// Routes
app.use("/api/auth/user", authRoutes);
app.use("/api/v1/category", categoryRoutes); //Q:C
app.use("/api/v1/question", questionRoutes); //Q:C
// app.use("/api/user", userRoutes);
// app.use("/api", featureRoutes);
// app.use("/api", codeRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/user", metricsRoutes);
// app.use("/api/auth", socialAuthRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

// Server Connection
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

export default app;
