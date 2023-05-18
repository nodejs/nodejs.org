// This is used for telling Next.js to to a Static Export Build of the Website
// We use this within this config file to determine the output directory of this generated sitemap files
const enableStaticExport = process.env.NEXT_STATIC_EXPORT === 'true';

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: 'https://nodejs.org',
  changefreq: 'always',
  trailingSlash: false,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: enableStaticExport ? 'build' : 'public',
  sourceDir: enableStaticExport ? 'build' : '.next',
  output: enableStaticExport ? 'export' : undefined,
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
