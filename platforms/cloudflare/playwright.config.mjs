/**
 * Playwright configuration for the Cloudflare platform: tests run against a
 * local `wrangler dev` server simulating the Cloudflare hosting. The worker
 * must be built first (`pnpm --filter=@node-core/platform-cloudflare build:worker`).
 *
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
export default {
  use: { baseURL: 'http://127.0.0.1:8787' },
  webServer: {
    stdout: 'pipe',
    command: 'pnpm --filter=@node-core/platform-cloudflare preview',
    url: 'http://127.0.0.1:8787',
    timeout: 60_000 * 3,
  },
};
