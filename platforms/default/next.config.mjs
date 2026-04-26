/**
 * Platform config contributed by the default deployment target.
 *
 * @type {import('../../apps/site/next.platform.config').PlatformConfig}
 */
export default {
  aliases: {
    '@platform/analytics': '@node-core/platform-default/analytics.tsx',
    '@platform/instrumentation':
      '@node-core/platform-default/instrumentation.ts',
    '@platform/next.config.mjs': '@node-core/platform-default/next.config.mjs',
  },
  mdx: {
    // Defaults for local dev / static export / generic hosting. Platform
    // packages override these via their own `next.config.mjs`.
    wasm: true,
    twoslash: true,
  },
};
