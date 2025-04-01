'use strict';

/**
 * This is used to verify if the current Website is running on a Development Environment
 */
export const IS_DEV_ENV = process.env.NODE_ENV === 'development';

/**
 * This is used for telling Next.js if the Website is deployed on Vercel
 *
 * Can be used for conditionally enabling features that we know are Vercel only
 *
 * @see https://vercel.com/docs/projects/environment-variables/system-environment-variables#VERCEL_ENV
 */
export const VERCEL_ENV = process.env.VERCEL_ENV || undefined;

/**
 * This is used for telling Next.js if we are current during build time or in runtime environment
 *
 * Can be used for conditionally enabling features that we know are Vercel only
 *
 * @see https://vercel.com/docs/projects/environment-variables/system-environment-variables#VERCEL_REGION
 */
export const VERCEL_REGION = process.env.VERCEL_REGION || undefined;

/**
 * This is used for telling Next.js to do a Static Export Build of the Website
 *
 * This is used for static/without a Node.js server hosting, such as on our
 * legacy Website Build Environment on Node.js's DigitalOcean Droplet.
 *
 * Note that this is a manual Environment Variable defined by us during `npm run deploy`
 */
export const ENABLE_STATIC_EXPORT =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === true;

/**
 * This is used to ensure that pages are Static Export for all locales or only
 * in the default (`en`) locale.
 *
 * Note that this is a manual Environment Variable defined by us during the
 * build process in CI.
 */
export const ENABLE_STATIC_EXPORT_LOCALE =
  process.env.NEXT_PUBLIC_STATIC_EXPORT_LOCALE === 'true' ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT_LOCALE === true;

/**
 * This is used for any place that requires the full canonical URL path for the Node.js Website (and its deployment), such as for example, the Node.js RSS Feed.
 *
 * This variable can either come from the Vercel Deployment as `NEXT_PUBLIC_VERCEL_URL` or from the `NEXT_PUBLIC_BASE_URL` Environment Variable that is manually defined
 * by us if necessary. Otherwise it will fallback to the default Node.js Website URL.
 *
 * @see https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables#framework-environment-variables
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://nodejs.org';

/**
 * This is used for any place that requires the Node.js distribution URL (which by default is nodejs.org/dist)
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 */
export const DIST_URL =
  process.env.NEXT_PUBLIC_DIST_URL || 'https://nodejs.org/dist/';

/**
 * This is used for any place that requires the Node.js API Docs URL (which by default is nodejs.org/docs)
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 */
export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL || 'https://nodejs.org/docs/';

/**
 * Supports a manual override of the base path of the Website
 *
 * This is useful when running the deployment on a subdirectory
 * of a domain, such as when hosted on GitHub Pages.
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * This is used for fetching static next-data through the /en/next-data/ endpoint
 *
 * Note this is assumes that the Node.js Website is either running within Vercel Environment
 * or running locally (either production or development) mode
 *
 * Note this variable can be overridden via a manual Environment Variable defined by us if necessary.
 */
export const NEXT_DATA_URL = process.env.NEXT_PUBLIC_DATA_URL
  ? process.env.NEXT_PUBLIC_DATA_URL
  : VERCEL_ENV
    ? `${BASE_URL}${BASE_PATH}/en/next-data/`
    : `http://localhost:${process.env.PORT ?? 3000}/en/next-data/`;

/**
 * This ReGeX is used to remove the `index.md(x)` suffix of a name and to remove
 * the `.md(x)` extensions of a filename.
 *
 * This RegEx is used to transform the file system pathnames into acceptable
 * Route Segments for Next.js Dynamic Routes on `pages/[...path].tsx`
 */
export const MD_EXTENSION_REGEX = /((\/)?(index))?\.mdx?$/i;

/**
 * This is the default type of blog post type that we use for OG Meta Tags
 */
export const DEFAULT_CATEGORY_OG_TYPE = 'announcement';

/**
 * This is the base url for changelog entries
 */
export const BASE_CHANGELOG_URL =
  'https://github.com/nodejs/node/releases/tag/v';

/**
 * This defines how many blog posts each pagination page should have
 */
export const BLOG_POSTS_PER_PAGE = 6;

/**
 * The `localStorage` key to store the theme choice of `next-themes`
 *
 * This is what allows us to store user preference for theming
 */
export const THEME_STORAGE_KEY = 'theme';

/**
 * This is a list of all external links that are used on website sitemap.
 * @see https://github.com/nodejs/nodejs.org/issues/5813 for more context
 */
export const EXTERNAL_LINKS_SITEMAP = [
  'https://terms-of-use.openjsf.org/',
  'https://privacy-policy.openjsf.org/',
  'https://bylaws.openjsf.org/',
  'https://code-of-conduct.openjsf.org/',
  'https://trademark-policy.openjsf.org/',
  'https://trademark-list.openjsf.org/',
  'https://www.linuxfoundation.org/cookies',
];

/**
 * These are the default Orama Query Parameters that are used by the Website
 * @see https://docs.oramasearch.com/open-source/usage/search/introduction
 */
export const DEFAULT_ORAMA_QUERY_PARAMS = {
  limit: 25,
  threshold: 0,
  boost: {
    pageSectionTitle: 4,
    pageSectionContent: 2.5,
    pageTitle: 1.5,
  },
  facets: {
    siteSection: {},
  },
};

/**
 * The initial Orama Cloud chat suggestions visible in the empty state of the search box.
 */
export const DEFAULT_ORAMA_SUGGESTIONS = [
  'How to install Node.js?',
  'How to create an HTTP server?',
  'Upgrading Node.js version',
];

/**
 * The default batch size to use when syncing Orama Cloud
 */
export const ORAMA_SYNC_BATCH_SIZE = 50;

/**
 * The default Orama Cloud endpoint to use when searching with Orama Cloud.
 */
export const ORAMA_CLOUD_ENDPOINT =
  process.env.NEXT_PUBLIC_ORAMA_ENDPOINT ||
  'https://cloud.orama.run/v1/indexes/nodejs-org-dev-hhqrzv';

/**
 * The default Orama Cloud API Key to use when searching with Orama Cloud.
 * This is a public API key and can be shared publicly on the frontend.
 */
export const ORAMA_CLOUD_API_KEY =
  process.env.NEXT_PUBLIC_ORAMA_API_KEY || 'qopIuAERiWP2EZOpDjvczjws7WV40yrj';

/**
 * A GitHub Access Token for accessing the GitHub API and not being rate-limited
 * The current token is registered on the "nodejs-vercel" GitHub Account.
 *
 * Note: This has no NEXT_PUBLIC prefix as it should not be exposed to the Browser.
 */
export const GITHUB_API_KEY = process.env.NEXT_GITHUB_API_KEY || '';

/**
 * The resource we point people to when discussing internationalization efforts.
 */
export const TRANSLATION_URL =
  'https://github.com/nodejs/nodejs.org/blob/main/TRANSLATION.md#how-to-translate';
