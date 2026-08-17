/**
 * @type {import('next').NextConfig}
 */
export default {
  // `BASE_URL` (see `apps/site/next.constants.mjs`) reads
  // `NEXT_PUBLIC_BASE_URL` and falls back to the canonical
  // `https://nodejs.org`. On Vercel deployments where it isn't set explicitly
  // (e.g. previews) we point it at the URL Vercel generated instead.
  env:
    !process.env.NEXT_PUBLIC_BASE_URL && process.env.VERCEL_URL
      ? { NEXT_PUBLIC_BASE_URL: `https://${process.env.VERCEL_URL}` }
      : {},
  // `NODE_OPTIONS=--conditions=vercel` (see `vercel.json`) only applies to
  // Node's own resolver, which is what loads this file. Turbopack resolves
  // `#platform/*` with its own set of conditions and, unlike webpack, exposes
  // no way to extend them (i think).
  //
  // TODO(@avivkeller): File a bug with turbopack
  turbopack: {
    resolveAlias: {
      '#platform/analytics': '@node-core/platform-vercel/analytics.tsx',
      '#platform/instrumentation':
        '@node-core/platform-vercel/instrumentation.ts',
      '#platform/shiki.mjs': '@node-core/platform-vercel/shiki.mjs',
    },
  },
};
