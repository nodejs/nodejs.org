import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

import { isSvgImage } from '@/util/imageUtils';

const MDXImage: FC<ImageProps> = ({ width, height, alt, src, ...props }) => {
  const isUnoptimizedImage = isSvgImage(src.toString());

  if (!width || !height) {
    // Since `width` and `height` are not provided in the Markdown image format,
    // we provide the height and width automatically.
    // @see https://nextjs.org/docs/pages/building-your-application/optimizing/images
    return (
      <Image
        {...props}
        src={src}
        unoptimized={isUnoptimizedImage}
        alt={alt}
        width={0}
        height={0}
        sizes="(min-width: 768px) 200vw, 500vw"
        className="h-auto w-auto"
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      width={width}
      height={height}
      src={src}
      unoptimized={isUnoptimizedImage}
    />
  );
};

export default MDXImage;
