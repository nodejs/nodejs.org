/**
 * Platform config contributed by the Vercel deployment target.
 *
 * Consumed by `apps/site/next.config.mjs` via the platform-config loader.
 * Must export a default `{ nextConfig, aliases, images }` shape — any of
 * which may be omitted when the platform has nothing to contribute.
 *
 * @type {import('@node-core/platform-vercel/next.platform.config').PlatformConfig}
 */
const vercelDeploymentUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export default {
  nextConfig: {
    // Expose Vercel's auto-assigned deployment URL as a platform-agnostic
    // `NEXT_PUBLIC_BASE_URL` so `apps/site` consumers can read a single
    // canonical env var. A manually-set `NEXT_PUBLIC_BASE_URL` wins.
    env: {
      NEXT_PUBLIC_BASE_URL:
        process.env.NEXT_PUBLIC_BASE_URL || vercelDeploymentUrl || '',
    },
  },
  aliases: {
    '@platform/analytics': '@node-core/platform-vercel/analytics',
    '@platform/instrumentation': '@node-core/platform-vercel/instrumentation',
  },
};
