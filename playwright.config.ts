import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isHeadless = process.env.HEADLESS !== 'false';
const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: '.',
  testMatch: ['tests/**/*.spec.ts'],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01
    }
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL,
    headless: isHeadless,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },
  projects: [
    {
      name: 'setup',
      testMatch: ['tests/setup/**/*.setup.ts']
    },
    {
      name: 'chromium',
      testIgnore: ['tests/setup/**/*.setup.ts', 'tests/e2e/authenticated-*.spec.ts'],
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'chromium-auth',
      testMatch: ['tests/e2e/authenticated-*.spec.ts'],
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/customer.json'
      }
    },
    {
      name: 'firefox',
      testIgnore: ['tests/setup/**/*.setup.ts', 'tests/e2e/authenticated-*.spec.ts'],
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      testIgnore: ['tests/setup/**/*.setup.ts', 'tests/e2e/authenticated-*.spec.ts'],
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chromium',
      testIgnore: ['tests/setup/**/*.setup.ts', 'tests/e2e/authenticated-*.spec.ts'],
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 412, height: 915 }
      }
    },
    {
      name: 'mobile-webkit',
      testIgnore: ['tests/setup/**/*.setup.ts', 'tests/e2e/authenticated-*.spec.ts'],
      use: {
        ...devices['iPhone 14'],
        viewport: { width: 390, height: 844 }
      }
    }
  ]
});
