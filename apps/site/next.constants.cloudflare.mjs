'use strict';

/**
 * Whether the build process is targeting the Cloudflare open-next build or not.
 *
 * TODO: The `OPEN_NEXT_CLOUDFLARE` environment variable is being
 *       defined in the worker building script, ideally the open-next
 *       adapter should set it itself when it invokes the Next.js build
 *       process, once it does that remove the manual `OPEN_NEXT_CLOUDFLARE`
 *       definition in the package.json script.
 */
export const OPEN_NEXT_CLOUDFLARE = process.env.OPEN_NEXT_CLOUDFLARE;
