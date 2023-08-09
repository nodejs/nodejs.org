'use strict';

import * as nextLocales from './next.locales.mjs';

// We only need Locale Codes for our URL redirects and rewrties
const localeCodes = nextLocales.availableLocales.map(locale => locale.code);

// This allows us to prefix redirect with all available locale codes, so that redirects are not bound to a single locale
// This also transforms the locale itself as a matching group that can be used for rewrites
// This match group also has an empty string match for the lack of locales, for example
// Example: /:locale(ar/|ca/|de/|en/|es/|fa/|fr/|)about/security
// Would match /ar/about/security, /ar/about/security/ for every language code (replace "ar") and
// it would also match /about/security (without any language prefix)
const localesMatch = `/:locale(${localeCodes.join('|')}|)?/`;

/**
 * These are external redirects that happen before we check dynamic routes and rewrites
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added and some were modified to match Next.js's syntax
 *
 * @TODO: These values should be no-code; These should be imported from a JSON file or something similar
 *
 * @type {import('next').NextConfig['redirects']}
 */
const redirects = async () => [
  {
    source: '/index.html',
    destination: '/',
    permanent: true,
  },
  {
    source: '/api.html',
    destination: '/api',
    permanent: true,
  },
  {
    source: '/changelog.html',
    destination: 'https://github.com/nodejs/node/blob/HEAD/CHANGELOG.md',
    permanent: true,
  },
  {
    source: '/calendar',
    destination:
      'https://calendar.google.com/calendar/embed?src=nodejs.org_nr77ama8p7d7f9ajrpnu506c98%40group.calendar.google.com',
    permanent: true,
  },
  {
    source: '/calendar.ics',
    destination:
      'https://calendar.google.com/calendar/ical/nodejs.org_nr77ama8p7d7f9ajrpnu506c98%40group.calendar.google.com/public/basic.ics',
    permanent: true,
  },
  {
    source: `${localesMatch}security`,
    destination:
      'https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security',
    permanent: true,
  },
  {
    source: `${localesMatch}contribute/accepting_contributions.html`,
    destination: 'https://github.com/nodejs/dev-policy',
    permanent: true,
  },
  {
    source: `${localesMatch}about/releases`,
    destination: 'https://github.com/nodejs/release#release-schedule',
    permanent: true,
  },
  {
    source: `${localesMatch}about/security`,
    destination:
      'https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security',
    permanent: true,
  },
  {
    source: `${localesMatch}advisory-board`,
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: `${localesMatch}about/advisory-board`,
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: `${localesMatch}about/organization`,
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: `${localesMatch}about/organization/tsc-meetings`,
    destination: 'https://github.com/nodejs/TSC/tree/HEAD/meetings',
    permanent: true,
  },
  {
    source: `${localesMatch}about/trademark`,
    destination: 'https://trademark-policy.openjsf.org',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation`,
    destination: 'https://openjsf.org',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/case-studies`,
    destination: 'https://openjsf.org/projects',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/members`,
    destination: 'https://openjsf.org/about/members',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/board`,
    destination: 'https://openjsf.org/about/governance',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/tsc`,
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/certification`,
    destination: 'https://openjsf.org/certification',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/in-the-news`,
    destination: 'https://openjsf.org',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/announcements`,
    destination: 'https://openjsf.org/blog',
    permanent: true,
  },
  {
    source: `${localesMatch}foundation/education`,
    destination: 'https://openjsf.org/certification',
    permanent: true,
  },
];

/**
 * These are rewrites that happen before we check dynamic routes and after we check regular redirects
 * These should be used either for internal or external rewrite rules (like NGINX, for example)
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added and some were modified to match Next.js's syntax
 *
 * @TODO: These values should be no-code; These should be imported from a JSON file or something similar
 *
 * @type {import('next').NextConfig['rewrites']}
 */
const rewrites = async () => ({
  afterFiles: [
    {
      source: '/about',
      destination: '/en/about',
    },
    {
      source: '/community',
      destination: '/en/get-involved',
    },
    {
      source: '/contribute/:path*',
      destination: '/en/get-involved',
    },
    {
      source: '/documentation/:path*',
      destination: '/en/docs/:path*',
    },
    {
      source: '/blog/:path*',
      destination: '/en/blog/:path*',
    },
    {
      source: `${localesMatch}community`,
      destination: '/:locale/get-involved',
    },
    {
      source: `${localesMatch}contribute/:path*`,
      destination: '/:locale/get-involved',
    },
    {
      source: `${localesMatch}documentation/:path*`,
      destination: '/:locale/docs/:path*',
    },
    {
      source: '/(atom|feed|rss).xml',
      destination: '/en/feed/blog.xml',
    },
    {
      source: '/feed',
      destination: '/en/feed/blog.xml',
    },
    {
      source: '/feed/release',
      destination: '/en/feed/releases.xml',
    },
    {
      source: '/feed/vulnerability',
      destination: '/en/feed/vulnerability.xml',
    },
    {
      source: '/(static/|)favicon.ico',
      destination: '/static/images/favicons/favicon.png',
    },
    {
      source: '/(static/|)favicon.png',
      destination: '/static/images/favicons/favicon.png',
    },
    {
      source: '/(static/|)apple-touch-icon(.*).png',
      destination: '/static/images/favicons/favicon.png',
    },
    {
      source: '/logos/:path*',
      destination: '/static/images/logos/:path*',
    },
  ],
});

export { rewrites, redirects };
