import { isSvgImage } from '@node-core/ui-components/utils/imageUtils';
import type { ImageProps } from 'next/image';
import { default as Image } from 'next/image';
import type { FC } from 'react';
const MDXImage: FC<ImageProps> = ({ src, width = 0, height = 0, ...props }) => {
  const isUnoptimizedImage = isSvgImage(src.toString());

  // Since `width` and `height` are not provided in the Markdown image format,
  // we provide the height and width automatically.
  // @see https://nextjs.org/docs/pages/building-your-application/optimizing/images
  const autoSize = width === 0 || height === 0;

  return (
    <Image
      {...props}
      src={src}
      unoptimized={isUnoptimizedImage}
      width={width}
      height={height}
      sizes={autoSize ? '(min-width: 768px) 200vw, 500vw' : undefined}
      className={autoSize ? 'h-auto w-auto' : undefined}
    />
  );
};

export default MDXImage;
