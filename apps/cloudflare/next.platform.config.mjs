import { createRequire } from 'node:module';
import { relative } from 'node:path';

import { getDeploymentId } from '@opennextjs/cloudflare';

const require = createRequire(import.meta.url);

/**
 * Platform config contributed by the Cloudflare deployment target.
 *
 * Consumed by `apps/site/next.config.mjs` via the platform-config loader.
 * Must export a default `{ nextConfig, aliases, images }` shape — any of
 * which may be omitted when the platform has nothing to contribute.
 *
 * @type {import('@node-core/platform-cloudflare/next.platform.config').PlatformConfig}
 */
export default {
  nextConfig: {
    // Skew protection: Cloudflare routes requests by deploymentId so that
    // a client and the worker stay in sync across rolling deploys.
    deploymentId: await getDeploymentId(),
  },
  aliases: {
    '@platform/analytics': '@node-core/platform-cloudflare/analytics',
    '@platform/instrumentation':
      '@node-core/platform-cloudflare/instrumentation',
  },
  images: {
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
  },
  mdx: {
    // Cloudflare workers can't load `shiki/wasm` via `WebAssembly.instantiate`
    // with custom imports (blocked for security), so fall back to the
    // JavaScript RegEx engine. Twoslash also needs a VFS we don't have here.
    wasm: false,
    twoslash: false,
  },
};
