import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(_on, config) {
      return config;
    },
  },
  component: {
    specPattern: "src/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/component.ts",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});