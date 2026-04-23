/**
 * Default (no-op) platform config used when no `DEPLOY_TARGET` is set —
 * local dev, static export, generic hosting, etc.
 *
 * Platform deployments (Vercel, Cloudflare, …) provide their own
 * `next.platform.config.mjs` that overrides these values. Keep this
 * file free of any platform-specific code.
 *
 * Alias values are project-relative strings (not absolute paths) so
 * Turbopack resolves them correctly — Turbopack treats absolute paths
 * as server-relative and rejects them.
 */
export default {
  aliases: {
    '@platform/analytics': './platform/analytics.tsx',
    '@platform/instrumentation': './platform/instrumentation.ts',
  },
  mdx: {
    // Defaults for local dev / static export / generic hosting. Platform
    // packages override these via their own `next.platform.config.mjs`.
    wasm: true,
    twoslash: true,
  },
};
