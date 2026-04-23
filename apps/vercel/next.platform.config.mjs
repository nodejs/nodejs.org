/**
 * Platform config contributed by the Vercel deployment target.
 *
 * Consumed by `apps/site/next.config.mjs` via the `#platform/*` import
 * map. Heavy, Node-only bits live inside async thunks so that webpack —
 * which bundles the top level of this module into the server output
 * when `apps/site/mdx/plugins.mjs` reads `.mdx` — never drags them into
 * the Node server runtime (keeps bundles lean and parity with
 * Cloudflare's contract).
 *
 * @type {import('../site/next.platform.config').PlatformConfig}
 */
export default {
  aliases: {
    '@platform/analytics': '@node-core/platform-vercel/analytics',
    '@platform/instrumentation': '@node-core/platform-vercel/instrumentation',
  },
  mdx: {
    // Vercel supports the fast Oniguruma WASM engine and twoslash transforms,
    // so keep parity with the default standalone config.
    wasm: true,
    twoslash: true,
  },
  nextConfig: async () => {
    const VERCEL_URL = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined;
    return {
      // Expose Vercel's auto-assigned deployment URL as a platform-agnostic
      // `NEXT_PUBLIC_BASE_URL` so `apps/site` consumers can read a single
      // canonical env var. A manually-set `NEXT_PUBLIC_BASE_URL` wins.
      env: {
        NEXT_PUBLIC_BASE_URL:
          process.env.NEXT_PUBLIC_BASE_URL || VERCEL_URL || '',
      },
    };
  },
};
