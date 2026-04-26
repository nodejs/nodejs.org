const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:8787';

/**
 * Playwright overrides contributed by the Cloudflare deployment target.
 *
 * Consumed by `apps/site/playwright.config.ts` via the platform-config
 * loader. Spins up the wrangler preview so E2E runs against the
 * OpenNext worker artifact rather than `next dev`.
 *
 * @type {import('../../apps/site/playwright.platform.config').PlatformPlaywrightConfig}
 */
export default {
  use: { baseURL: BASE_URL },
  webServer: {
    stdout: 'pipe',
    command: 'pnpm --filter=@node-core/platform-cloudflare dev:cloudflare',
    url: BASE_URL,
    timeout: 60_000 * 3,
  },
};
