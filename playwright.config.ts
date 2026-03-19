import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/e2e',

  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});