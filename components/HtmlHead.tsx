import Head from 'next/head';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useRouter } from '@/hooks/useRouter';
import { useLocale } from '@/hooks/useLocale';
import { BASE_URL, BASE_PATH } from '@/next.constants.mjs';
import type { LegacyFrontMatter } from '@/types';
import type { FC } from 'react';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

type HeaderProps = { frontMatter: LegacyFrontMatter };

const HtmlHead: FC<HeaderProps> = ({ frontMatter }) => {
  const siteConfig = useSiteConfig();
  const { asPath } = useRouter();
  const { availableLocales, currentLocale, defaultLocale } = useLocale();

  const canonicalLink = `${baseUrlAndPath}${asPath}`;

  const pageTitle = frontMatter.title
    ? `${frontMatter.title} | ${siteConfig.title}`
    : siteConfig.title;

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name="theme-color" content={siteConfig.accentColor}></meta>

      <meta name="robots" content={frontMatter.robots || 'index, follow'} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={siteConfig.description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:description" content={siteConfig.description} />

      <meta
        property="og:image"
        content={`${baseUrlAndPath}${siteConfig.featuredImage}`}
      />

      <meta property="og:image:type" content={siteConfig.og.imgType} />
      <meta property="og:image:width" content={siteConfig.og.imgWidth} />
      <meta property="og:image:height" content={siteConfig.og.imgHeight} />

      <meta name="twitter:card" content={siteConfig.twitter.card} />
      <meta name="twitter:site" content={siteConfig.twitter.username} />
      <meta name="twitter:title" content={pageTitle} />

      <meta
        name="twitter:image"
        content={`${baseUrlAndPath}${siteConfig.twitter.img}`}
      />

      <meta name="twitter:image:alt" content={siteConfig.twitter.imgAlt} />

      <link rel="canonical" href={canonicalLink} />

      <link
        rel="icon"
        href={`${baseUrlAndPath}${siteConfig.favicon}`}
        type="image/png"
      />

      <link
        rel="alternate"
        hrefLang="x-default"
        href={canonicalLink.replace(
          `/${currentLocale.code}`,
          `/${defaultLocale.code}`
        )}
      />

      {availableLocales.map(locale => (
        <link
          key={locale.code}
          rel="alternate"
          hrefLang={locale.code}
          href={canonicalLink.replace(
            `/${currentLocale.code}`,
            `/${locale.code}`
          )}
        />
      ))}

      {siteConfig.rssFeeds.map(feed => (
        <link
          key={feed.file}
          title={feed.title}
          href={`${baseUrlAndPath}/en/feed/${feed.file}`}
          rel="alternate"
          type="application/rss+xml"
        />
      ))}
    </Head>
  );
};

export default HtmlHead;
