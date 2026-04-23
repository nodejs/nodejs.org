/**
 * Platform config contributed by the Cloudflare deployment target.
 *
 * Consumed by `apps/site/next.config.mjs` via the `#platform/*` import
 * map. Heavy, Node-only bits (`@opennextjs/cloudflare`, `createRequire`,
 * `require.resolve`) live inside async thunks so that webpack — which
 * bundles the top level of this module into the server output when
 * `apps/site/mdx/plugins.mjs` reads `.mdx` — never drags them into the
 * worker runtime.
 *
 * @type {import('../site/next.platform.config').PlatformConfig}
 */
export default {
  aliases: {
    '@platform/analytics': '@node-core/platform-cloudflare/analytics',
    '@platform/instrumentation':
      '@node-core/platform-cloudflare/instrumentation',
  },
  mdx: {
    // Cloudflare workers can't load `shiki/wasm` via `WebAssembly.instantiate`
    // with custom imports (blocked for security), so fall back to the
    // JavaScript RegEx engine. Twoslash also needs a VFS we don't have here.
    wasm: false,
    twoslash: false,
  },
  nextConfig: async () => {
    const { getDeploymentId } = await import('@opennextjs/cloudflare');
    return {
      // Skew protection: Cloudflare routes requests by deploymentId so that
      // a client and the worker stay in sync across rolling deploys.
      deploymentId: await getDeploymentId(),
    };
  },
  images: async () => {
    const { createRequire } = await import('node:module');
    const { relative } = await import('node:path');
    const require = createRequire(import.meta.url);
    return {
      // Route optimized images through Cloudflare's Images service via the
      // custom loader. `remotePatterns` do NOT apply here — Cloudflare
      // enforces allowed origins at the edge instead.
      loader: 'custom',
      // Next.js joins `loaderFile` onto its own cwd (apps/site), so pass a
      // path relative to that cwd rather than an absolute one. Resolving via
      // `require.resolve` avoids the `new URL(..., import.meta.url)` pattern,
      // which webpack rewrites as an asset reference and mangles at runtime.
      loaderFile: relative(
        process.cwd(),
        require.resolve('@node-core/platform-cloudflare/image-loader')
      ),
    };
  },
};
