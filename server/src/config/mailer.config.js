import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); //load env variables

const transporter = nodemailer.createTransport({
  service: "gmail", // or use host & port
  auth: {
    user: "darunkumar1204@gmail.com",
    pass: "vqkxhbfoohnvlyuo",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
