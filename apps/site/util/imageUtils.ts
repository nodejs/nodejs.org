/**
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
  if (image.endsWith('.svg')) {
    return true;
  }

  return false;
};
