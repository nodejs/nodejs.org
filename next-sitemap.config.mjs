'use strict';

import * as nextConstants from './next.constants.mjs';

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: 'https://nodejs.org',
  changefreq: 'always',
  trailingSlash: false,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: nextConstants.ENABLE_STATIC_EXPORT ? 'build' : 'public',
  sourceDir: nextConstants.ENABLE_STATIC_EXPORT ? 'build' : '.next',
  output: nextConstants.ENABLE_STATIC_EXPORT ? 'export' : undefined,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/dist/', '/docs/'],
        allow: ['/dist/latest/', '/dist/latest/docs/api/', '/api/'],
      },
    ],
  },
};

export default sitemapConfig;
