'use strict';

/** @type {import('next').NextConfig['rewrites']} */
const rewrites = async () => ({
  // These are redirects that happen before we check dynamic routes and after we check regular redirects
  // These should be used either for internal or external rewrite rules (like NGINX, for example)
  // These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
  // and were then converted to Next.js rewrites. Note that only relevant rewrites were added and some were modified to match Next.js's syntax
  afterFiles: [
    {
      source: '/index.html',
      destination: '/',
    },
    {
      source: '/changelog.html',
      destination: 'https://github.com/nodejs/node/blob/HEAD/CHANGELOG.md',
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
      source: '/contribute/accepting_contributions.html',
      destination: 'https://github.com/nodejs/dev-policy',
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
      source: '/about/releases',
      destination: 'https://github.com/nodejs/release#release-schedule',
    },
    {
      source: '/about/security',
      destination:
        'https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security',
    },
    {
      source: '/about/trademark',
      destination: '/en/about/trademark',
    },
    {
      source: '/advisory-board',
      destination: 'https://github.com/nodejs/TSC',
    },
    {
      source: '/about/advisory-board',
      destination: 'https://github.com/nodejs/TSC',
    },
    {
      source: '/about/organization',
      destination: 'https://github.com/nodejs/TSC',
    },
    {
      source: '/about/organization/tsc-meetings',
      destination: 'https://github.com/nodejs/TSC/tree/HEAD/meetings',
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
    {
      source: '/calendar',
      destination:
        'https://calendar.google.com/calendar/embed?src=nodejs.org_nr77ama8p7d7f9ajrpnu506c98%40group.calendar.google.com',
    },
    {
      source: '/calendar.ics',
      destination:
        'https://calendar.google.com/calendar/ical/nodejs.org_nr77ama8p7d7f9ajrpnu506c98%40group.calendar.google.com/public/basic.ics',
    },
    {
      source: '/(en|uk|)/foundation',
      destination: 'https://foundation.nodejs.org/',
    },
    {
      source: '/(en|uk|)/foundation/case-studies',
      destination: 'https://openjsf.org/projects',
    },
    {
      source: '/(en|uk|)/foundation/members',
      destination: 'https://openjsf.org/about/members',
    },
    {
      source: '/(en|uk|)/foundation/board',
      destination: 'https://openjsf.org/about/governance',
    },
    {
      source: '/(en|uk|)/foundation/tsc',
      destination: 'https://github.com/nodejs/TSC',
    },
    {
      source: '/(en|uk|)/foundation/certification',
      destination: 'https://openjsf.org/certification',
    },
    {
      source: '/(en|uk|)/foundation/in-the-news',
      destination: 'https://openjsf.org',
    },
    {
      source: '/(en|uk|)/foundation/announcements',
      destination: 'https://openjsf.org/blog',
    },
    {
      source: '/(en|uk|)/foundation/education',
      destination: 'https://openjsf.org/certification',
    },
    {
      source: '/(en|uk|)/foundation/members.html',
      destination: 'https://openjsf.org/about/members',
    },
  ],
});

export default rewrites;
