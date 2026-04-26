/**
 * Platform config contributed by the Vercel deployment target.
 *
 * @type {import('../../apps/site/next.platform.config').PlatformConfig}
 */
export default {
  aliases: {
    '@platform/analytics': '@node-core/platform-vercel/analytics.tsx',
    '@platform/instrumentation':
      '@node-core/platform-vercel/instrumentation.ts',
    '@platform/next.config.mjs': '@node-core/platform-vercel/next.config.mjs',
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
    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || VERCEL_URL;

    return {
      // Expose Vercel's auto-assigned deployment URL as a platform-agnostic
      // `NEXT_PUBLIC_BASE_URL` so `apps/site` consumers can read a single
      // canonical env var. A manually-set `NEXT_PUBLIC_BASE_URL` wins. Only
      // contribute the entry when a value is actually present so downstream
      // truthiness vs. existence checks behave the same as if the var were
      // never set.
      env: NEXT_PUBLIC_BASE_URL ? { NEXT_PUBLIC_BASE_URL } : undefined,
    };
  },
};
