import Image from 'next/image';

import type { ImageProps } from 'next/image';
import type { FC } from 'react';

const MDXImage: FC<ImageProps> = ({ width, height, alt, src, ...props }) => {
  if (!width || !height) {
    // Since `width` and `height` are not provided in the Markdown image format,
    // we provide the height and width automatically.
    // @see https://nextjs.org/docs/pages/building-your-application/optimizing/images
    return (
      <Image
        {...props}
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(min-width: 768px) 200vw, 500vw"
        className="h-auto w-auto"
      />
    );
  }

  return <Image {...props} alt={alt} width={width} height={height} src={src} />;
};

export default MDXImage;
