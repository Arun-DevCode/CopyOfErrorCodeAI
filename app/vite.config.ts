import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@Providers": path.resolve(__dirname, "./src/Providers"),
      "@Services": path.resolve(__dirname, "./src/Services"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
  server: {
    port: 8201,
  },
});
