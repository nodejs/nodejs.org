import { defineConfig, devices } from '@playwright/test';

import { DEPLOY_TARGET } from './next.constants.mjs';

/**
 * Load Playwright overrides contributed by the active deployment target.
 *
 * Mirrors how `next.config.mjs` loads `next.platform.config` from the
 * matching `@node-core/platform-<target>` package. Each platform owns
 * its own webServer / baseURL wiring so this file stays platform-neutral.
 */
const { default: platform } = DEPLOY_TARGET
  ? await import(
      `@node-core/platform-${DEPLOY_TARGET}/playwright.platform.config`
    )
  : await import('./playwright.platform.config.mjs');

const isCI = !!process.env.CI;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['html'], ['github']] : [['html']],
  ...(platform.webServer ? { webServer: platform.webServer } : {}),
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ||
      platform.baseURL ||
      'http://127.0.0.1:3000',
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
