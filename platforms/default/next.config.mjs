/**
 * Platform config contributed by the default deployment target.
 *
 * @type {import('../../apps/site/next.platform.config').PlatformConfig}
 */
export default {
  mdx: {
    // Defaults for local dev / static export / generic hosting. Platform
    // packages override these via their own `next.config.mjs`.
    wasm: true,
    twoslash: true,
  },
};
