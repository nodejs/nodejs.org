/**
 * This is a temporary workaround that can be removed once Next.js is upgraded.
 * See https://github.com/vercel/next.js/pull/72970
 *
 * Checks if the given source string points to an SVG image.
 *
 * This function examines the base part of the provided string (ignoring query parameters)
 * to determine if it ends with the `.svg` extension.
 *
 * @param src - The URL or string representing the source of the image.
 * @returns `true` if the source points to an SVG image, otherwise `false`.
 */
export const isSvgImage = (src: string): boolean => {
  // Split the source string at the '?' character to separate the main path from query parameters
  const [image] = src.split('?');

  // Check if the base path (before any query parameters) ends with '.svg'
  return image.endsWith('.svg');
};
