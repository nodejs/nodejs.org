import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (process.env.NODE_ENV === 'development') {
    // Serve the original image when using `next dev`
    return src;
  }

  // Sets the requested width by next/image
  const params = new Map<string, string>();

  if (width > 0) {
    params.set('width', `${width}`);
  }

  if (quality && quality > 0) {
    params.set('quality', `${quality}`);
  }

  const pathParams = [...params]
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  return `/cdn-cgi/image/${pathParams}/${normalizeSrc(src)}`;
}
