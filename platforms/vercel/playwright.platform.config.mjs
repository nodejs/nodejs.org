/**
 * Playwright overrides contributed by the Vercel deployment target.
 *
 * Vercel builds run on external preview URLs, so no local webServer is
 * started — the CI workflow provides `PLAYWRIGHT_BASE_URL` pointing at
 * the deployment. Left intentionally empty so `apps/site/playwright.config.ts`
 * falls back to its default baseURL.
 *
 * @type {import('../../apps/site/playwright.platform.config').PlatformPlaywrightConfig}
 */
export default {};
