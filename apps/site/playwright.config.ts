import { defineConfig, devices, type Config } from '@playwright/test';

import json from './package.json' with { type: 'json' };

const isCI = !!process.env.CI;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['html'], ['github']] : [['html']],
  ...getWebServerConfig(),
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

function getWebServerConfig(): Pick<Config, 'webServer'> {
  if (!json.scripts['cloudflare:preview']) {
    throw new Error('cloudflare:preview script not defined');
  }

  if (process.env.PLAYWRIGHT_RUN_CLOUDFLARE_PREVIEW) {
    return {
      webServer: {
        command: 'pnpm turbo run cloudflare:preview',
        url: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
        timeout: 60_000 * 3,
      },
    };
  }

  return {};
}
