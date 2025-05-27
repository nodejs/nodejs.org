import { defineConfig, devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const isCI = !!process.env.CI;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['html'], ['github']] : [['html']],
  ...(() => {
    const use: PlaywrightTestConfig['use'] = {
      baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
      trace: 'on-first-retry',
    };

    const webServerCommand = process.env.PLAYWRIGHT_WEB_SERVER_COMMAND;
    const webServerPort = parseInt(
      process.env.PLAYWRIGHT_WEB_SERVER_PORT ?? ''
    );
    if (webServerCommand && !isNaN(webServerPort)) {
      use.baseURL = `http://127.0.0.1:${webServerPort}`;
      return {
        webServer: {
          command: webServerCommand,
          port: webServerPort,
          stdout: 'pipe',
          stderr: 'pipe',
          timeout: 60_000 * 3,
        },
        use,
      };
    }

    return {
      use,
    };
  })(),
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
