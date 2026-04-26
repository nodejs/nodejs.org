import { ENABLE_STATIC_EXPORT } from './next.constants.mjs';

const remotePatterns = [
  'https://avatars.githubusercontent.com/**',
  'https://bestpractices.coreinfrastructure.org/**',
  'https://raw.githubusercontent.com/nodejs/**',
  'https://user-images.githubusercontent.com/**',
  'https://website-assets.oramasearch.com/**',
];

/**
 * Returns the Next.js `images` configuration, preferring any platform-provided
 * override (e.g. Cloudflare's custom loader) over the default remotePatterns +
 * static-export unoptimized defaults.
 *
 * @param {import('next').NextConfig['images']} [platformImagesOverride]
 */
export const getImagesConfig = platformImagesOverride => {
  if (platformImagesOverride) {
    return platformImagesOverride;
  }

  return {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    // We add it to the remote pattern for the static images we use from multiple sources
    // to be marked as safe sources (these come from Markdown files)
    remotePatterns: remotePatterns.map(url => new URL(url)),
  };
};
