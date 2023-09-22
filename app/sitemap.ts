import { allPaths } from '@/next.dynamic.mjs';
import { defaultLocale } from '@/next.locales.mjs';
import {
  STATIC_ROUTES_IGNORES,
  DYNAMIC_GENERATED_ROUTES,
  BASE_PATH,
  BASE_URL,
  EXTERNAL_LINKS_SITEMAP,
} from '@/next.constants.mjs';
import type { MetadataRoute } from 'next';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Node.js Website
// Next.js Sitemap Generation doesn't support `alternate` refs yet
// @see https://github.com/vercel/next.js/discussions/55646
const sitemap = (): MetadataRoute.Sitemap => {
  // Retrieves all the dynamic generated paths
  const dynamicRoutes = DYNAMIC_GENERATED_ROUTES();

  // Retrieves all the static paths for the default locale (English)
  // and filter out the routes that should be ignored
  const staticPaths = [...allPaths.get(defaultLocale.code)!]
    .filter(route => STATIC_ROUTES_IGNORES.every(e => !e(route)))
    .map(route => route.routeWithLocale);

  // The current date of this request
  const currentDate = new Date().toISOString();

  const appRoutes = [...dynamicRoutes, ...staticPaths]
    .sort()
    .map(route => `${baseUrlAndPath}/${route}`);

  return [...appRoutes, ...EXTERNAL_LINKS_SITEMAP].map(route => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: 'always',
  }));
};

export default sitemap;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
