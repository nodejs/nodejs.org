import { deflateSync } from 'node:zlib';

import matter from 'gray-matter';

import { VERCEL_REVALIDATE } from '@/next.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';
import { defaultLocale } from '@/next.locales.mjs';
import { parseRichTextIntoPlainText } from '@/util/stringUtils';

// This is the Route Handler for the `GET` method which handles the request
// for a digest and metadata of all existing pages on Node.js Website
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async () => {
  const allAvailbleRoutes = await dynamicRouter.getRoutesByLanguage(
    defaultLocale.code
  );

  const availablePagesMetadata = allAvailbleRoutes
    .filter(route => !route.startsWith('blog'))
    .map(async pathname => {
      const { source, filename } = await dynamicRouter.getMarkdownFile(
        defaultLocale.code,
        pathname
      );

      // Gets the title and the Description from the Page Metadata
      const { title, description } = await dynamicRouter.getPageMetadata(
        defaultLocale.code,
        pathname
      );

      // Parser the Markdown source with `gray-matter` and then only
      // grabs the markdown content and cleanses it by removing HTML/JSX tags
      // removing empty/blank lines or lines just with spaces and trims each line
      // from leading and trailing paddings/spaces
      const cleanedContent = parseRichTextIntoPlainText(matter(source).content);

      // Deflates a String into a base64 string-encoded (zlib compressed)
      const deflatedSource = deflateSync(cleanedContent).toString('base64');

      // Returns metadata of each page available on the Website
      return {
        filename,
        pathname,
        title,
        description,
        content: deflatedSource,
      };
    });

  return Response.json(await Promise.all(availablePagesMetadata));
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/page-data/` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () => [
  { locale: defaultLocale.code },
];

// Enforces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = VERCEL_REVALIDATE;
