/**
 * Platform config contributed by the Cloudflare deployment target.
 *
 * @type {import('../../apps/site/next.platform.config').PlatformConfig}
 */
export default {
  aliases: {
    '@platform/analytics': '@node-core/platform-cloudflare/analytics.tsx',
    '@platform/instrumentation':
      '@node-core/platform-cloudflare/instrumentation.ts',
    '@platform/next.config.mjs':
      '@node-core/platform-cloudflare/next.config.mjs',
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
      deploymentId: getDeploymentId(),
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
        require.resolve('@node-core/platform-cloudflare/image-loader.ts')
      ),
    };
  },
};
