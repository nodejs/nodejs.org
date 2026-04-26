/**
 * Default Playwright platform config used when no `DEPLOY_TARGET` is set —
 * local dev against `next dev`, static export, generic hosting. Each
 * platform contributes its own `baseURL` (with optional
 * `PLAYWRIGHT_BASE_URL` override for CI), so consumers just spread
 * `platform.use` into their `defineConfig` call.
 *
 * @type {import('../playwright.platform.config').PlatformPlaywrightConfig}
 */
export default {
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000' },
};
