import db from "mongoose";

const connectDB = async () => {
  try {
    db.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    db.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });

    db.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Reconnecting...");
    });

    await db.connect(process.env.MONGO_URI, {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // IPv4
    });
  } catch (error) {
    console.error("MongoDB initial connection failed");
    process.exit(1); // app will NOT start
  }
};

export default connectDB;
