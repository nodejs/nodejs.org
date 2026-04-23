/**
 * Default (no-op) Playwright platform config used when no `DEPLOY_TARGET`
 * is set — local dev against `next dev`, static export, generic hosting.
 *
 * Platform deployments (Vercel, Cloudflare, …) provide their own
 * `playwright.platform.config.mjs` that overrides these values. Keep
 * this file free of any platform-specific code.
 *
 * @type {import('./playwright.platform.config').PlatformPlaywrightConfig}
 */
export default {};
