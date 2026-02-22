import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(_on, _config) {
      return _config;
    },
  },

  component: {
    supportFile: "cypress/support/component.ts",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});