import type { MetadataRoute } from 'next';

import {
  BASE_PATH,
  BASE_URL,
  EXTERNAL_LINKS_SITEMAP,
} from '@/next.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';
import { availableLocaleCodes, defaultLocale } from '@/next.locales.mjs';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Node.js Website
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const routes = await dynamicRouter.getRoutesByLanguage(defaultLocale.code);
  const paths = [];

  const currentDate = new Date().toISOString();

  for (const route of routes) {
    const availableLocalesForRoute = [];

    for (const locale of availableLocaleCodes.filter(
      locale => locale !== defaultLocale.code
    )) {
      const markdownFile = await dynamicRouter.getMarkdownFile(locale, route);
      const isAvailable = markdownFile.filename !== '';
      if (isAvailable) {
        availableLocalesForRoute.push(locale);
      }
    }

    const alternatesPaths = availableLocalesForRoute.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: `${baseUrlAndPath}/${locale}/${route}`,
      }),
      {}
    );

    paths.push({
      url: `${baseUrlAndPath}/${defaultLocale.code}/${route}`,
      lastModified: currentDate,
      changeFrequency: 'always' as const,
      alternates: {
        languages: {
          ...alternatesPaths,
        },
      },
    });
  }

  return [
    ...paths,
    ...EXTERNAL_LINKS_SITEMAP.map(route => ({
      url: route,
      lastModified: currentDate,
      changeFrequency: 'always' as const,
    })),
  ];
};

export default sitemap;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
