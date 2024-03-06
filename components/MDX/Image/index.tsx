import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';

type HTMLImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const MDXImage: FC<ImageProps> = ({ width, height, alt, ...props }) => {
  if (!width || !height) {
    // When `width` and `height` are not provided in markdown image format, we
    // have to use the default HTML `img` tag.
    // @example ![alt](url title)
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...(props as HTMLImageProps)} alt={alt} />;
  }

  return <Image {...props} alt={alt} width={width} height={height} />;
};

export default MDXImage;
