import { BASE_URL } from '#site/next.constants.mjs';

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
  sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/learn/sitemap.xml`],
});

export default robots;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = false;
