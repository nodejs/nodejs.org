export const isSvgImage = (src: string) => {
  let isSvg = false;

  if (src.includes('.svg')) {
    const image = new URL(src);

    if (image.pathname.endsWith('.svg')) {
      isSvg = true;
    }
  }

  return isSvg;
};
