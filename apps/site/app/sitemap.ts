import { availableLocaleCodes, defaultLocale } from '@node-core/website-i18n';

import {
  BASE_PATH,
  BASE_URL,
  EXTERNAL_LINKS_SITEMAP,
} from '#site/next.constants.mjs';
import { BLOG_DYNAMIC_ROUTES } from '#site/next.dynamic.constants.mjs';
import { dynamicRouter } from '#site/next.dynamic.mjs';

import type { MetadataRoute } from 'next';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

// All available alternate locales
const nonDefaultLocales = availableLocaleCodes.filter(
  l => l !== defaultLocale.code
);

const getFullPath = (r: string, l: string) =>
  /^https?:\/\//.test(r) ? r : `${baseUrlAndPath}/${l}/${r}`;

const getAlternatePaths = (r: string, locales: Array<string>) =>
  Object.fromEntries(locales.map(l => [l, getFullPath(r, l)]));

// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Node.js Website
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // Gets a list of all statically available routes
  const routes = await dynamicRouter.getAllRoutes();

  const currentDate = new Date().toISOString();

  const getSitemapEntry = (r: string, locales: Array<string> = []) => ({
    url: getFullPath(r, defaultLocale.code),
    lastModified: currentDate,
    changeFrequency: 'always' as const,
    alternates: { languages: getAlternatePaths(r, locales) },
  });

  const staticPaths = routes.map(r => getSitemapEntry(r, nonDefaultLocales));
  const blogPaths = BLOG_DYNAMIC_ROUTES.map(r => getSitemapEntry(`blog/${r}`));
  const externalPaths = EXTERNAL_LINKS_SITEMAP.map(r => getSitemapEntry(r));

  return [...staticPaths, ...blogPaths, ...externalPaths];
};

export default sitemap;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = false;
