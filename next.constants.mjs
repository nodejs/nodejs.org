'use strict';

/**
 * This is used for telling Next.js if the Website is deployed on Vercel
 *
 * Can be used for conditionally enabling features that we know are Vercel only
 *
 * @see https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables#framework-environment-variables
 */
export const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV || undefined;

/**
 * This is used for telling Next.js to to a Static Export Build of the Website
 *
 * This is used for static/without a Node.js server hosting, such as on our
 * legacy Website Build Environment on Node.js's DigitalOcean Droplet.
 *
 * Note that this is a manual Environment Variable defined by us during `npm run deploy`
 */
export const ENABLE_STATIC_EXPORT =
  process.env.NEXT_STATIC_EXPORT === 'true' ||
  process.env.NEXT_STATIC_EXPORT === true;

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
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'https://nodejs.org';

/**
 * This is used for any place that requires the Node.js distribution URL (which by default is nodejs.org/dist)
 *
 * Note that this is a manual Environment Variable defined by us if necessary.
 */
export const DIST_URL =
  process.env.NEXT_PUBLIC_DIST_URL || 'https://nodejs.org/dist/';

/**
 * This is used for any place that requires the Node.js API Docs URL (which by default is nodejs.org/docs)
 *
 * Note that this is a manual Environment Variable defined by us if necessary.
 */
export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL || 'https://nodejs.org/docs/';

/**
 * Supports a manual override of the base path of the Website
 *
 * This is useful when running the deployment on a subdirectory
 * of a domain, such as when hosted on GitHub Pages.
 *
 * Note that this is a manual Environment Variable defined by us if necessary.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * This ReGeX is used to remove the `index.md(x)` suffix of a name and to remove
 * the `.md(x)` extensions of a filename.
 *
 * This RegEx is used to transform the file system pathnames into acceptable
 * Route Segments for Next.js Dynamic Routes on `pages/[...path].tsx`
 */
export const MD_EXTENSION_REGEX = /((\/)?(index))?\.mdx?$/i;

/***
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
 * The `localStorage` key to store the theme choice of `next-themes`
 */
export const THEME_STORAGE_KEY = 'theme';

/**
 * This is the Sentry DSN for the Node.js Website Project
 */
export const SENTRY_DSN =
  'https://02884d0745aecaadf5f780278fe5fe70@o4506191161786368.ingest.sentry.io/4506191307735040';

/**
 * This states if Sentry should be enabled and bundled within our App
 */
export const SENTRY_ENABLE =
  process.env.NODE_ENV === 'development' || !!VERCEL_ENV;

/**
 * This configures the sampling rate for Sentry
 *
 * @note we always want to capture 100% on preview branches and development mode
 */
export const SENTRY_CAPTURE_RATE =
  SENTRY_ENABLE && BASE_URL !== 'https://nodejs.org' ? 1.0 : 0.01;

/**
 * Provides the Route for Sentry's Server-Side Tunnel
 */
export const SENTRY_TUNNEL = (components = '') =>
  SENTRY_ENABLE ? `/monitoring${components}` : undefined;

/**
 * This configures which Sentry features to tree-shake/remove from the Sentry bundle
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
 */
export const SENTRY_EXTENSIONS = {
  __SENTRY_DEBUG__: false,
  __SENTRY_TRACING__: false,
  __RRWEB_EXCLUDE_IFRAME__: true,
  __RRWEB_EXCLUDE_SHADOW_DOM__: true,
  __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
};
