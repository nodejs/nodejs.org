import { getDeploymentId } from '@opennextjs/cloudflare';

/**
 * @type {import('next').NextConfig}
 */
export default {
  // Skew protection: Cloudflare routes requests by deploymentId so a client
  // and the worker stay in sync across rolling deploys.
  deploymentId: await getDeploymentId(),
  images: {
    // Cloudflare image optimization requires a custom loader. Note that this
    // replaces the shared `images` configuration: `remotePatterns` do not
    // apply, as allowed source origins are enforced at the edge instead
    // (configured in the Cloudflare dashboard to the same values).
    // https://developers.cloudflare.com/images/transform-images/sources/
    loader: 'custom',
    // Relative to the Next.js app directory (`apps/site`), where the build
    // runs.
    loaderFile: '../../platforms/cloudflare/image-loader.ts',
  },
  // `NODE_OPTIONS=--conditions=cloudflare` only applies to Node's own resolver,
  // which is what loads this file. The bundler resolves `#platform/*` with its
  // own set of conditions, so it must be told about `cloudflare` separately —
  // without this, the bundled code falls back to `platforms/default`.
  webpack: config => {
    config.resolve.conditionNames = [
      'cloudflare',
      // Anything already configured by Next.js, which in turn inherits
      // webpack's defaults through the `'...'` entry.
      ...config.resolve.conditionNames,
    ];

    return config;
  },
};
