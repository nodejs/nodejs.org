import type { MetadataRoute } from 'next';

// This allows us to generate a `robots.txt` file dynamically based on the needs of the Node.js Website
// @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      disallow: ['/dist/', '/docs/'],
      allow: ['/dist/latest/', '/dist/latest/docs/api/', '/api/'],
    },
  ],
});

export default robots;
