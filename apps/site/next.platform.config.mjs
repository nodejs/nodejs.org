import { fileURLToPath } from 'node:url';

/**
 * Default (no-op) platform config used when no `DEPLOY_TARGET` is set —
 * local dev, static export, generic hosting, etc.
 *
 * Platform deployments (Vercel, Cloudflare, …) provide their own
 * `next.platform.config.mjs` that overrides these values. Keep this
 * file free of any platform-specific code.
 */
export default {
  aliases: {
    '@platform/analytics': fileURLToPath(
      new URL('./platform/analytics.tsx', import.meta.url)
    ),
    '@platform/instrumentation': fileURLToPath(
      new URL('./platform/instrumentation.ts', import.meta.url)
    ),
  },
  mdx: {
    // Defaults for local dev / static export / generic hosting. Platform
    // packages override these via their own `next.platform.config.mjs`.
    wasm: true,
    twoslash: true,
  },
};
