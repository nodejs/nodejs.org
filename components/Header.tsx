import Head from 'next/head';
import { Source_Sans_Pro } from '@next/font/google';

import { useSiteConfig } from '../hooks/useSiteConfig';
import { LegacyFrontMatter } from '../types';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600'],
  display: 'fallback',
});

type HeaderProps = { frontMatter: LegacyFrontMatter };

const Header = ({ frontMatter }: HeaderProps) => {
  const siteConfig = useSiteConfig();

  const pageTitle = frontMatter.title || siteConfig.title;

  return (
    <Head>
      <style jsx global>
        {`
          body {
            font: 400 20px/1.5 ${sourceSansPro.style.fontFamily}, 'Open Sans',
              Roboto, 'San Francisco', Helvetica, Arial, sans-serif;
          }
        `}
      </style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/a11y-dark.min.css"
      />

      <title>{siteConfig.title}</title>

      <link rel="icon" href={siteConfig.favicon} type="image/png" />

      <meta name="robots" content={frontMatter.robots || 'index, follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={siteConfig.description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.featuredImage} />
      <meta property="og:image:type" content={siteConfig.og.imgType} />
      <meta property="og:image:width" content={siteConfig.og.imgWidth} />
      <meta property="og:image:height" content={siteConfig.og.imgHeight} />

      <meta name="twitter:card" content={siteConfig.twitter.card} />
      <meta name="twitter:site" content={siteConfig.twitter.username} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:image" content={siteConfig.twitter.img} />
      <meta name="twitter:image:alt" content={siteConfig.twitter.imgAlt} />
    </Head>
  );
};

export default Header;
