import type { MetadataRoute } from 'next';
import { BASE_PATH, BASE_URL } from '@/next.constants.mjs';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    disallow: ['/dist/', '/docs/'],
    allow: ['/dist/latest/', '/dist/latest/docs/api/', '/api/'],
  },
  sitemap: `${baseUrlAndPath}/sitemap.xml`,
});

export default robots;
