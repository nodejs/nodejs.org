import { useRouter } from 'next/router';
import Head from 'next/head';

import { useSiteConfig } from '../hooks/useSiteConfig';

import type { LegacyFrontMatter } from '../types';

type HeaderProps = { frontMatter: LegacyFrontMatter };

const HtmlHead = ({ frontMatter }: HeaderProps) => {
  const siteConfig = useSiteConfig();
  const { route, basePath } = useRouter();

  const canonicalLink = `https://nodejs.org${route}`;

  const pageTitle = frontMatter.title
    ? `${frontMatter.title} | ${siteConfig.title}`
    : siteConfig.title;

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name="theme-color" content={siteConfig.accentColor}></meta>

      <link
        rel="icon"
        href={`${basePath}${siteConfig.favicon}`}
        type="image/png"
      />

      <meta name="robots" content={frontMatter.robots || 'index, follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={siteConfig.description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:description" content={siteConfig.description} />

      <meta
        property="og:image"
        content={`${basePath}${siteConfig.featuredImage}`}
      />

      <meta property="og:image:type" content={siteConfig.og.imgType} />
      <meta property="og:image:width" content={siteConfig.og.imgWidth} />
      <meta property="og:image:height" content={siteConfig.og.imgHeight} />

      <meta name="twitter:card" content={siteConfig.twitter.card} />
      <meta name="twitter:site" content={siteConfig.twitter.username} />
      <meta name="twitter:title" content={pageTitle} />

      <meta
        name="twitter:image"
        content={`${basePath}${siteConfig.twitter.img}`}
      />

      <meta name="twitter:image:alt" content={siteConfig.twitter.imgAlt} />

      <link rel="canonical" href={canonicalLink} />

      {siteConfig.rssFeeds.map(feed => (
        <link
          key={feed.file}
          rel="alternate"
          href={`${basePath}/en/feed/${feed.file}`}
          title={feed.title}
          type="application/rss+xml"
        />
      ))}
    </Head>
  );
};

export default HtmlHead;
