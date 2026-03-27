import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    // tsconfig의 paths와 동기화: "@/*" → "./*"
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
