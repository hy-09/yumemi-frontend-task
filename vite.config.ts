import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/yumemi-frontend-task/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "/src/vitest-setup.ts",
  },
});
