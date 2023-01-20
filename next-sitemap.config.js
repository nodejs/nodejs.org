/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nodejs.org',
  generateRobotsTxt: true,
  trailingSlash: true,
  generateIndexSitemap: false,
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
