import type { Metadata, Viewport } from 'next';

import {
  provideBlogCategories,
  provideBlogPosts,
} from './next-data/providers/blogData';
import { BASE_PATH, BASE_URL } from './next.constants.mjs';
import { siteConfig } from './next.json.mjs';
import { defaultLocale } from './next.locales.mjs';
import type { Layouts } from './types';

type RouteSegment = {
  locale: string;
  pathname: string;
};

/**
 * This is a list of all static routes or pages from the Website that we do not
 * want to allow to be statically built on our Static Export Build.
 */
export const IGNORED_ROUTES: Array<(route: RouteSegment) => boolean> = [
  // This is used to ignore all blog routes except for the English language
  ({ locale, pathname }) =>
    locale !== defaultLocale.code && /^blog/.test(pathname),
];

/**
 * This constant is used to create static routes on-the-fly that do not have a file-system
 * counterpart route. This is useful for providing routes with matching Layout Names
 * but that do not have Markdown content and a matching file for the route
 */
export const DYNAMIC_ROUTES = new Map<string, Layouts>([
  // Provides Routes for all Blog Categories
  ...provideBlogCategories().map(c => [`blog/${c}`, 'blog-category'] as [string, Layouts]),
  // Provides Routes for all Blog Categories w/ Pagination
  ...provideBlogCategories()
    // retrieves the amount of pages for each blog category
    .map(c => [c, provideBlogPosts(c).pagination.pages])
    // creates a numeric array for each page and define a pathname for
    // each page for a category (i.e. blog/all/page/1)
    .map(([c, t]) => [...Array(t).keys()].map(p => `blog/${c}/page/${p + 1}`))
    // creates a tuple of each pathname and layout for the route
    .map(paths => paths.map(path => [path, 'blog-category'] as [string, Layouts]))
    // flattens the array since we have a .map inside another .map
    .flat()
]);


/**
 * This is the default Next.js Page Metadata for all pages
 */
export const PAGE_METADATA = {
  metadataBase: new URL(`${BASE_URL}${BASE_PATH}`),
  title: siteConfig.title,
  description: siteConfig.description,
  robots: { index: true, follow: true },
  twitter: {
    card: siteConfig.twitter.card,
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
} as Metadata;

/**
 * This is the default Next.js Viewport Metadata for all pages
 */
export const PAGE_VIEWPORT: Viewport = {
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
