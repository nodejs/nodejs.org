import { getServerSideSitemap } from 'next-sitemap';
import { allPaths } from '@/next.dynamic.mjs';
import { defaultLocale, availableLocales } from '@/next.locales.mjs';
import {
  STATIC_ROUTES_IGNORES,
  DYNAMIC_GENERATED_ROUTES,
  BASE_PATH,
  BASE_URL,
} from '@/next.constants.mjs';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

// This method populates and generates the Website Sitemap by using `next-sitemap` SSR functionality
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = () => {
  // Retrieves all the dynamic generated paths
  const dynamicRoutes = DYNAMIC_GENERATED_ROUTES();

  // Retrieves all the static paths for the default locale (English)
  // and filter out the routes that should be ignored
  const staticPaths = [...allPaths.get(defaultLocale.code)!]
    .filter(route => STATIC_ROUTES_IGNORES.every(e => !e(route)))
    .map(route => route.routeWithLocale);

  // The current date of this request
  const currentDate = new Date().toISOString();

  return getServerSideSitemap(
    [...dynamicRoutes, ...staticPaths].sort().map(route => ({
      loc: `${baseUrlAndPath}/${route}`,
      lastmod: currentDate,
      changefreq: 'always',
      // We build the alternate languages based on the source pages
      // This allows Google to correctly index these pages
      alternateRefs: availableLocales.map(locale => ({
        hreflang: locale.code,
        hrefIsAbsolute: true,
        href: `${baseUrlAndPath}/${route.replace(
          `${defaultLocale.code}/`,
          `${locale.code}/`
        )}`,
      })),
    }))
  );
};

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
