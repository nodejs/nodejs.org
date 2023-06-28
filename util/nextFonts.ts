import { Source_Sans_3, Open_Sans } from 'next/font/google';

const sourceSans = Source_Sans_3({
  weight: ['400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

const openSans = Open_Sans({
  weight: ['300', '400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

export { sourceSans, openSans };
