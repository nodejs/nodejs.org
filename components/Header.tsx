import Head from 'next/head';
import { Source_Sans_Pro } from '@next/font/google';

import { useSiteConfig } from '../hooks/useSiteConfig';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600'],
  display: 'fallback',
});

const Header = () => {
  const siteConfig = useSiteConfig();

  return (
    <Head>
      <style jsx global>{`
        font: 400 20px/1.5 ${sourceSansPro.style.fontFamily}, 'Open Sans',
          Roboto, 'San Francisco', Helvetica, Arial, sans-serif;
      `}</style>
      <title>{siteConfig.title}</title>
    </Head>
  );
};

export default Header;
