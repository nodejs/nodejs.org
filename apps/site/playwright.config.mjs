import { defineConfig, devices } from '@playwright/test';

import { PLATFORM_ALIAS } from './next.platform.constants.mjs';

/**
 * Playwright loads this config via Node, so resolve the active platform
 * via a dynamic import keyed on `DEPLOY_TARGET` rather than a
 * `@platform/*` alias (those only resolve inside Turbopack/webpack).
 *
 * @type {{ default: import('./playwright.platform.config.d.ts').PlatformPlaywrightConfig }}
 */
const { default: platform } = await import(
  `${PLATFORM_ALIAS}/playwright.config.mjs`
);

const isCI = !!process.env.CI;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['html'], ['github']] : [['html']],
  ...platform,
  use: {
    ...platform.use,
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
