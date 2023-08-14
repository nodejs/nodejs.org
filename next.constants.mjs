'use strict';

import { blogData } from './next.json.mjs';
import { defaultLocale } from './next.locales.mjs';

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

/**
 * This is a shorthand to the Default Locale if you're only interested
 * on the Locale Code.
 *
 * This should only be used outside of the Next.js Application itself
 * as within React context the `useLocale` hook should be used instead.
 */
export const DEFAULT_LOCALE_CODE = defaultLocale.code;

/**
 * This indicates the path to the Legacy JavaScript File that is used
 * on the legacy Website.
 *
 * @deprecated The Legacy Website is due to be removed soon and this file
 * and its usages should be removed
 */
export const LEGACY_JAVASCRIPT_FILE = `${BASE_PATH}/static/js/legacyMain.js`;

/**
 * This is a list of all static routes or pages from the Website that we do not
 * want to allow to be statically built on our Static Export Build.
 *
 * @type {((route: import('./types').RouteSegment) => boolean)[]} A list of Ignored Routes by Regular Expressions
 */
export const STATIC_ROUTES_IGNORES = [
  // This is used to ignore is used to ignore all blog routes except for the English language
  route => !route.localised && /^blog\//.test(route.pathname),
  // This is used to ignore the blog/pagination meta route
  route => /^blog\/pagination/.test(route.pathname),
];

/**
 * This is a list of all dynamic routes or pages from the Website that we do not
 * want to allow to be dynamically access by our Dynamic Route Engine
 *
 * @type {RegExp[]} A list of Ignored Routes by Regular Expressions
 */
export const DYNAMIC_ROUTES_IGNORES = [
  // This is used to ignore the blog/pagination route
  /^blog\/pagination/,
];

/**
 * This is a list of all static routes that we want to rewrite their pathnames
 * into something else. This is useful when you want to have the current pathname in the route
 * but replace the actual Markdown file that is being loaded by the Dynamic Route to something else
 *
 * @type {[RegexExp, (pathname: string) => string][]}
 */
export const DYNAMIC_ROUTES_REWRITES = [
  [/^blog\/year-/, () => 'blog/pagination'],
];

/**
 * This is a constant that should be used during runtime by (`getStaticPaths`) on `pages/[...path].tsx`
 *
 * This function is used to provide an extra set of routes that are not provided by `next.dynamic.mjs`
 * static route discovery. This can happen when we have dynamic routes that **must** be provided
 * within the static export (static build) of the website. This constant usually would be used along
 * with a matching pathname on `DYNAMIC_ROUTES_REWRITES`.
 *
 * @returns {string[]} A list of all the Dynamic Routes that are generated by the Website
 */
export const DYNAMIC_GENERATED_ROUTES = () => [
  ...blogData.pagination.map(year => `en/blog/year-${year}`),
];
