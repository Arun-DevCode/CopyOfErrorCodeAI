import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";
import transporter from "../config/mailer.config.js";
import AppError from "../utils/AppError.js";

// ESM __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Service
async function sendMail(user, loginLink) {
  try {
    // Resolve template path safely (ESM)
    const templatePath = "src/template/onboardEmail.hbs";

    // Read template
    const source = await fs.readFile(templatePath, "utf-8");

    // Compile template
    const template = handlebars.compile(source);

    // Inject dynamic data
    const htmlContent = template({
      name: user.username,
      email: user.email,
      password: user.password,
      login_link: loginLink,
      year: new Date().getFullYear(),
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"Error Code AI" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome to Error Code AI",
      html: htmlContent,
    });

    return info.messageId;
  } catch (error) {
    throw new AppError(error.message || "Email sending failed", 500);
  }
}

export default sendMail;
