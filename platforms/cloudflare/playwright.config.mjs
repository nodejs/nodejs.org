/** @type {Partial<import('@playwright/test').PlaywrightTestConfig>} */
export default {
  use: { baseURL: 'http://127.0.0.1:8787' },
  webServer: {
    stdout: 'pipe',
    command: 'pnpm --filter=@node-core/platform-cloudflare dev',
    url: 'http://127.0.0.1:8787',
    timeout: 60_000 * 3,
  },
};
