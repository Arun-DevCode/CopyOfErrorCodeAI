// utils/cookieOptions.js

const cookieOptions = {
  httpOnly: true, // not accessible via JS
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict", // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

export default cookieOptions;
