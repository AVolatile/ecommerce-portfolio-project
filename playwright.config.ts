import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.QA_ORIGIN || "http://127.0.0.1:3000",
    headless: true,
    viewport: { width: 1280, height: 900 },
  },
  reporter: [
    ["list"],
    [
      "json",
      { outputFile: "portfolio-assets/validation/browser-results.json" },
    ],
  ],
  outputDir: "portfolio-assets/validation/test-artifacts",
});
