import { useRouter } from 'next/router';
import Head from 'next/head';

import { useSiteConfig } from '../hooks/useSiteConfig';
import { useLocale } from '../hooks/useLocale';

import type { LegacyFrontMatter } from '../types';

type HeaderProps = { frontMatter: LegacyFrontMatter };

// @TODO: Generate RSS feeds and include them here
const HtmlHead = ({ frontMatter }: HeaderProps) => {
  const siteConfig = useSiteConfig();
  const { currentLocale } = useLocale();
  const { route } = useRouter();

  const pageTitle = frontMatter.title || siteConfig.title;
  const canonicalLink = `https://nodejs.org/${currentLocale.code}${route}`;

  return (
    <Head>
      <title>{siteConfig.title}</title>

      <meta name="theme-color" content={siteConfig.accentColor}></meta>

      {/* @TODO: This should be generated during build with the site config */}
      <link rel="manifest" href="/manifest.json" />

      <link rel="icon" href={siteConfig.favicon} type="image/png" />

      <html lang={currentLocale.code} dir={currentLocale.langDir} />

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

      <link rel="canonical" href={canonicalLink} />
    </Head>
  );
};

export default HtmlHead;
