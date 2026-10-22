import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.ts",
  workers: 1,
  use: { baseURL: process.env.CONTAINER_BASE_URL ?? "http://127.0.0.1:3110", trace: "retain-on-failure", reducedMotion:'reduce' },
  timeout: 60000,
});
