'use strict';

/**
 * This is used to verify if the current Website is running on a Development Environment
 */
export const IS_DEV_ENV = process.env.NODE_ENV === 'development';

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
 * The full canonical URL of the deployed Website (used e.g. for the RSS feed).
 *
 * Platform-specific base URLs (such as Vercel's `VERCEL_URL`) are inlined into
 * `NEXT_PUBLIC_BASE_URL` at build time by each platform's `next.platform.config.mjs`,
 * keeping this module free of platform-specific branches.
 */
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://nodejs.org';

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
 * This is used for any place that requires the Node.js Learn URL (which by default is nodejs.org/learn)
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 */
export const LEARN_URL =
  process.env.NEXT_PUBLIC_LEARN_URL || 'https://nodejs.org/learn/';

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
  'https://ai-coding-assistants-policy.openjsf.org/',
  'https://terms-of-use.openjsf.org/',
  'https://privacy-policy.openjsf.org/',
  'https://bylaws.openjsf.org/',
  'https://code-of-conduct.openjsf.org/',
  'https://trademark-policy.openjsf.org/',
  'https://trademark-list.openjsf.org/',
  'https://www.linuxfoundation.org/cookies',
];

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
  'https://github.com/nodejs/nodejs.org/blob/main/docs/translation.md#how-to-translate';

/**
 * Define the order in which vulnerabilities should be sorted
 */
export const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'];

/**
 * Maps vulnerability severity levels to UI Badge kinds
 */
export const SEVERITY_KIND_MAP = {
  unknown: 'neutral',
  low: 'default',
  medium: 'info',
  high: 'warning',
  critical: 'error',
};

/**
 * Maps Node.js version status to UI Badge kinds
 *
 * @type {Record<import('./types/releases').NodeReleaseStatus, import('@node-core/ui-components/Common/Badge').BadgeKind>}
 */
export const STATUS_KIND_MAP = {
  EOL: 'warning',
  LTS: 'info',
  Current: 'default',
};

/**
 * The location of the Node.js Security Working Group Vulnerabilities data.
 */
export const VULNERABILITIES_URL =
  'https://raw.githubusercontent.com/nodejs/security-wg/main/vuln/core/index.json';

/**
 * The location of the OpenCollective data
 */
export const OPENCOLLECTIVE_MEMBERS_URL =
  'https://opencollective.com/nodejs/members/all.json';

/**
 * Orama DB URLs for the Learn and API sections of the website
 */
export const ORAMA_DB_URLS = {
  [LEARN_URL.slice(0, -1)]: 'https://nodejs.org/learn/orama-db.json',
  [`${DOCS_URL}latest/api`]: 'https://beta.docs.nodejs.org/orama-db.json',
};
