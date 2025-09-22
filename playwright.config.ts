import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: "https://conduit-api.learnwebdriverio.com",
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'examples',
      testDir: "./tests-examples",
      testMatch: "**/*.spec.ts",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'conduit-setup',
      testMatch: "**/*.setup.ts",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'conduit',
      dependencies: ['conduit-setup'],
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});
