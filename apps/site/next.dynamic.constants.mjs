'use strict';

import { provideBlogPosts } from '#site/next-data/providers/blogData';
import { blogData } from '#site/next.json.mjs';

import { BASE_PATH, BASE_URL } from './next.constants.mjs';
import { siteConfig } from './next.json.mjs';

/**
 * This constant is used to create static routes on-the-fly that do not have a file-system
 * counterpart route. This is useful for providing routes with matching Layout Names
 * but that do not have Markdown content and a matching file for the route
 *
 * @type {Array<string>} A Map of pathname and Layout Name
 */
export const BLOG_DYNAMIC_ROUTES = [
  // Provides Routes for all Blog Categories
  ...blogData.categories,
  // Provides Routes for all Blog Categories w/ Pagination
  ...blogData.categories
    // retrieves the amount of pages for each blog category
    .map(c => [c, provideBlogPosts(c).pagination.pages])
    // creates a numeric array for each page and define a pathname for
    // each page for a category (i.e. blog/all/page/1)
    .map(([c, t]) => [...Array(t).keys()].map(p => `${c}/page/${p + 1}`))
    // flattens the array since we have a .map inside another .map
    .flat(),
];

/**
 * This is the default Next.js Page Metadata for all pages
 *
 * @type {import('next').Metadata}
 */
export const PAGE_METADATA = {
  metadataBase: new URL(`${BASE_URL}${BASE_PATH}`),
  title: siteConfig.title,
  description: siteConfig.description,
  robots: { index: true, follow: true },
  twitter: {
    card: siteConfig.twitter.card,
    title: siteConfig.twitter.title,
    creator: siteConfig.twitter.username,
    images: {
      url: siteConfig.twitter.img,
      alt: siteConfig.twitter.imgAlt,
    },
  },
  alternates: {
    canonical: '',
    languages: { 'x-default': '' },
    types: {
      'application/rss+xml': `${BASE_URL}${BASE_PATH}/en/feed/blog.xml`,
    },
  },
  icons: { icon: siteConfig.favicon },
  openGraph: { images: siteConfig.twitter.img },
};

/**
 * This is the default Next.js Viewport Metadata for all pages
 *
 * @return {import('next').Viewport}
 */
export const PAGE_VIEWPORT = {
  themeColor: [
    {
      color: siteConfig.lightAccentColor,
      media: '(prefers-color-scheme: light)',
    },
    {
      color: siteConfig.darkAccentColor,
      media: '(prefers-color-scheme: dark)',
    },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
};
