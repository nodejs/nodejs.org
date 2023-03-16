/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nodejs.org',
  generateRobotsTxt: true,
  trailingSlash: false,
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
