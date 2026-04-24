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
  baseURL: 'http://127.0.0.1:8787',
  webServer: {
    stdout: 'pipe',
    command: 'pnpm --filter=@node-core/platform-cloudflare cloudflare:preview',
    url: 'http://127.0.0.1:8787',
    timeout: 60_000 * 3,
  },
};
