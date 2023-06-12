import { Source_Sans_Pro, Open_Sans } from 'next/font/google';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

const openSans = Open_Sans({
  weight: ['300', '400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

export { sourceSansPro, openSans };
