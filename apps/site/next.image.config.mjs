import {
  ENABLE_STATIC_EXPORT,
  OPEN_NEXT_CLOUDFLARE,
} from './next.constants.mjs';

export const getImagesConfig = () => {
  if (OPEN_NEXT_CLOUDFLARE) {
    // If we're building for the Cloudflare deployment we want to use the custom cloudflare image loader
    //
    // Important: The custom loader ignores `remotePatterns` as those are configured as allowed source origins
    //            (https://developers.cloudflare.com/images/transform-images/sources/)
    //            in the Cloudflare dashboard itself instead (to the exact same values present in `remotePatterns` below).
    //
    return {
      loader: 'custom',
      loaderFile: './cloudflare/image-loader.ts',
    };
  }

  return {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    // We add it to the remote pattern for the static images we use from multiple sources
    // to be marked as safe sources (these come from Markdown files)
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/**'),
      new URL('https://bestpractices.coreinfrastructure.org/**'),
      new URL('https://raw.githubusercontent.com/nodejs/**'),
      new URL('https://user-images.githubusercontent.com/**'),
      new URL('https://website-assets.oramasearch.com/**'),
    ],
  };
};
