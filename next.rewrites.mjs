'use strict';

/**
 * These are external redirects that happen before we check dynamic routes and rewrites
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added and some were modified to match Next.js's syntax
 *
 * @type {import('next').NextConfig['redirects']}
 */
const redirects = async () => [
  {
    source: '/changelog.html',
    destination: 'https://github.com/nodejs/node/blob/HEAD/CHANGELOG.md',
    permanent: true,
  },
  {
    source: '/contribute/accepting_contributions.html',
    destination: 'https://github.com/nodejs/dev-policy',
    permanent: true,
  },
  {
    source: '/about/releases',
    destination: 'https://github.com/nodejs/release#release-schedule',
    permanent: true,
  },
  {
    source: '/en/about/releases',
    destination: 'https://github.com/nodejs/release#release-schedule',
    permanent: true,
  },
  {
    source: '/about/security',
    destination:
      'https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security',
    permanent: true,
  },
  {
    source: '/advisory-board',
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: '/about/advisory-board',
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: '/about/organization',
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: '/about/organization/tsc-meetings',
    destination: 'https://github.com/nodejs/TSC/tree/HEAD/meetings',
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
    source: '/(en|uk|)/foundation',
    destination: 'https://foundation.nodejs.org/',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/case-studies',
    destination: 'https://openjsf.org/projects',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/members',
    destination: 'https://openjsf.org/about/members',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/board',
    destination: 'https://openjsf.org/about/governance',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/tsc',
    destination: 'https://github.com/nodejs/TSC',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/certification',
    destination: 'https://openjsf.org/certification',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/in-the-news',
    destination: 'https://openjsf.org',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/announcements',
    destination: 'https://openjsf.org/blog',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/education',
    destination: 'https://openjsf.org/certification',
    permanent: true,
  },
  {
    source: '/(en|uk|)/foundation/members.html',
    destination: 'https://openjsf.org/about/members',
    permanent: true,
  },
];

/**
 * These are rewrites that happen before we check dynamic routes and after we check regular redirects
 * These should be used either for internal or external rewrite rules (like NGINX, for example)
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added and some were modified to match Next.js's syntax
 *
 * @type {import('next').NextConfig['rewrites']}
 */
const rewrites = async () => ({
  afterFiles: [
    {
      source: '/index.html',
      destination: '/',
    },
    {
      source: '/api.html',
      destination: '/api/',
    },
    {
      source: '/community',
      destination: '/en/get-involved',
    },
    {
      source: '/contribute',
      destination: '/en/get-involved',
    },
    {
      source: '/contribute/becoming_collaborator.html',
      destination: '/en/get-involved',
    },
    {
      source: '/contribute/code_contributions',
      destination: '/en/get-involved',
    },
    {
      source: '/contribute/code_contributions/workflow.html',
      destination: '/en/get-involved',
    },
    {
      source: '/documentation(.*)',
      destination: '/en/docs',
    },
    {
      source: '/about',
      destination: '/en/about',
    },
    {
      source: '/about/trademark',
      destination: '/en/about/trademark',
    },
    {
      source: '/blog/:path*',
      destination: '/en/blog/:path*',
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
