import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

/** @type {import("vite").UserConfig} */
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reportsDirectory: "../coverage",
    },
    cache: false,
  },
});
