/**
 * This file extends on the `page.tsx` file, which is the default file that is used to render
 * the entry points for each locale and then also reused within the [...path] route to render the
 * and contains all logic for rendering our dynamic and static routes within the Node.js Website.
 *
 * Note: that each `page.tsx` should have its own `generateStaticParams` to prevent clash of
 * dynamic params, which will lead on static export errors and other sort of issues.
 */

import * as basePage from '@/app/[locale]/page';
import { ENABLE_STATIC_EXPORT } from '@/next.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';
import { availableLocaleCodes } from '@/next.locales.mjs';

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = basePage.generateViewport;

// This generates each page's HTML Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const generateMetadata = basePage.generateMetadata;

// This provides all the possible paths that can be generated statically
// + provides all the paths that we support on the Node.js Website
export const generateStaticParams = async () => {
  const allAvailableRoutes = await Promise.all(
    // Gets all mapped routes to the Next.js Routing Engine by Locale
    availableLocaleCodes.map(async (locale: string) => {
      const routesForLanguage = await dynamicRouter.getRoutesByLanguage(locale);

      return routesForLanguage.map(pathname =>
        dynamicRouter.mapPathToRoute(locale, pathname)
      );
    })
  );

  return ENABLE_STATIC_EXPORT ? allAvailableRoutes.flat().sort() : [];
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
