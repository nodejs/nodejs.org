/**
 * This file extends on the `page.tsx` file, which is the default file that is used to render
 * the entry points for each locale and then also reused within the [...path] route to render the
 * and contains all logic for rendering our dynamic and static routes within the Node.js Website.
 *
 * Note: that each `page.tsx` should have its own `generateStaticParams` to prevent clash of
 * dynamic params, which will lead on static export errors and other sort of issues.
 */

import * as basePage from '@/app/[locale]/page';
import {
  ENABLE_STATIC_EXPORT_LOCALE,
  ENABLE_STATIC_EXPORT,
} from '@/next.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';
import { availableLocaleCodes, defaultLocale } from '@/next.locales.mjs';

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = basePage.generateViewport;

// This generates each page's HTML Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const generateMetadata = basePage.generateMetadata;

// Generates all possible static paths based on the locales and environment configuration
// - Returns an empty array if static export is disabled (`ENABLE_STATIC_EXPORT` is false)
// - If `ENABLE_STATIC_EXPORT_LOCALE` is true, generates paths for all available locales
// - Otherwise, generates paths only for the default locale
// @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export const generateStaticParams = async () => {
  // Return an empty array if static export is disabled
  if (!ENABLE_STATIC_EXPORT) {
    return [];
  }

  // Helper function to fetch and map routes for a specific locale
  const getRoutesForLocale = async (locale: string) => {
    const routes = await dynamicRouter.getRoutesByLanguage(locale);

    return routes.map(pathname =>
      dynamicRouter.mapPathToRoute(locale, pathname)
    );
  };

  // Determine which locales to include in the static export
  const locales = ENABLE_STATIC_EXPORT_LOCALE
    ? availableLocaleCodes
    : [defaultLocale.code];

  // Generates all possible routes for all available locales
  const routes = await Promise.all(locales.map(getRoutesForLocale));

  return routes.flat().sort();
};

// Enforces that this route is used as static rendering
// Except whenever on the Development mode as we want instant-refresh when making changes
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;

export default basePage.default;
