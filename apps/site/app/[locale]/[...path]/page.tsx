/**
 * This file extends on the `page.tsx` file, which is the default file that is used to render
 * the entry points for each locale and then also reused within the [...path] route to render the
 * and contains all logic for rendering our dynamic and static routes within the Node.js Website.
 *
 * Note: that each `page.tsx` should have its own `generateStaticParams` to prevent clash of
 * dynamic params, which will lead on static export errors and other sort of issues.
 */

import { notFound } from 'next/navigation';
import type { FC } from 'react';

import { ENABLE_STATIC_EXPORT } from '#site/next.constants.mjs';
import { ENABLE_STATIC_EXPORT_LOCALE } from '#site/next.constants.mjs';
import { dynamicRouter } from '#site/next.dynamic.mjs';
import * as basePage from '#site/next.dynamic.page.mjs';
import { availableLocaleCodes, defaultLocale } from '#site/next.locales.mjs';
import type { DynamicParams } from '#site/types';

type PageParams = DynamicParams<{ path: Array<string> }>;

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

  const routes = await dynamicRouter.getAllRoutes();

  // Helper function to fetch and map routes for a specific locale
  const getRoutesForLocale = async (l: string) =>
    routes.map(pathname => dynamicRouter.mapPathToRoute(l, pathname));

  // Determine which locales to include in the static export
  const locales = ENABLE_STATIC_EXPORT_LOCALE
    ? availableLocaleCodes
    : [defaultLocale.code];

  // Generates all possible routes for all available locales
  const routesWithLocales = await Promise.all(locales.map(getRoutesForLocale));

  return routesWithLocales.flat().sort();
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<PageParams> = async props => {
  const { path, locale: routeLocale } = await props.params;

  // Gets the current full pathname for a given path
  const [locale, pathname] = basePage.getLocaleAndPath(path, routeLocale);

  // Gets the Markdown content and context
  const [content, context] = await basePage.getMarkdownContext({
    locale,
    pathname,
  });

  // If we have a filename and layout then we have a page
  if (context.filename && context.frontmatter.layout) {
    return basePage.renderPage({
      content,
      layout: context.frontmatter.layout,
      context,
    });
  }

  return notFound();
};

// Enforces that this route is used as static rendering
// Except whenever on the Development mode as we want instant-refresh when making changes
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;

export default getPage;
