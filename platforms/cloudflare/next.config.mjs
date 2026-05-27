import { createRequire } from 'node:module';
import { relative } from 'node:path';

import { getDeploymentId } from '@opennextjs/cloudflare';

// Next.js joins `loaderFile` onto its own cwd (apps/site), so pass a path
// relative to that cwd rather than an absolute one. `require.resolve` avoids
// the `new URL(..., import.meta.url)` pattern, which webpack rewrites as an
// asset reference and mangles at runtime.
const imageLoaderFile = relative(
  process.cwd(),
  require.resolve('@node-core/platform-cloudflare/image-loader.ts')
);

/** @type {Partial<import('next').NextConfig>} */
export default {
  // Skew protection: Cloudflare routes requests by deploymentId so a client
  // and the worker stay in sync across rolling deploys.
  deploymentId: await getDeploymentId(),
  images: {
    // `remotePatterns` do NOT apply here — Cloudflare enforces allowed
    // origins at the edge (configured in the Cloudflare dashboard).
    loader: 'custom',
    loaderFile: imageLoaderFile,
  },
};
