import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['html'], ['github']] : [['html']],
  ...(process.env.PLAYWRIGHT_WEB_SERVER_COMMAND
    ? {
        webServer: {
          command: process.env.PLAYWRIGHT_WEB_SERVER_COMMAND,
          url: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
          timeout: 60_000 * 3,
        },
      }
    : {}),
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
