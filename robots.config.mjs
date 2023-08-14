'use strict';

import {
  BASE_URL,
  BASE_PATH,
  ENABLE_STATIC_EXPORT,
} from './next.constants.mjs';

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: `${BASE_URL}${BASE_PATH}`,
  output: ENABLE_STATIC_EXPORT ? 'export' : undefined,
  // During Static Builds we want to output the sitemap files to the "build" directory whilst with regular Builds
  // we simply output the file to the public folder (which is the default)
  outDir: ENABLE_STATIC_EXPORT ? 'build' : 'public',
  // This "default" sitemap is a fallback for when our dynamic Sitemap Generation failed
  // In general this is not used, and should NOT be used
  sitemapBaseFileName: 'default-sitemap',
  // We don't need an "index" sitemap file, it is fine to simply have all in just one file
  // even thought we have a lot of routes on our siotemap
  generateIndexSitemap: false,
  // We want to enable `robots.txt` generation, and we define their rules on the `robotsTxtOptions` object
  generateRobotsTxt: true,
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
