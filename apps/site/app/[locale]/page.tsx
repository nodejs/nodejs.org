/**
 * This file contains the logic for rendering our dynamic and static routes within the Node.js Website
 * this page route template is used to render the entry points for each locale and then also reused within
 * the [...path] route to render the individual pages under each locale of the Website.
 *
 * Note: that each `page.tsx` should have its own `generateStaticParams` to prevent clash of
 * dynamic params, which will lead on static export errors and other sort of issues.
 */

import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { FC } from 'react';

import { setClientContext } from '#site/client-context';
import WithLayout from '#site/components/withLayout';
import {
  ENABLE_STATIC_EXPORT_LOCALE,
  ENABLE_STATIC_EXPORT,
} from '#site/next.constants.mjs';
import {
  PAGE_VIEWPORT,
  DYNAMIC_ROUTES,
} from '#site/next.dynamic.constants.mjs';
import { dynamicRouter } from '#site/next.dynamic.mjs';
import { allLocaleCodes, availableLocaleCodes } from '#site/next.locales.mjs';
import { defaultLocale } from '#site/next.locales.mjs';
import { MatterProvider } from '#site/providers/matterProvider';

type DynamicStaticPaths = { path: Array<string>; locale: string };
type DynamicParams = { params: Promise<DynamicStaticPaths> };

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = async () => ({ ...PAGE_VIEWPORT });

// This generates each page's HTML Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const generateMetadata = async (props: DynamicParams) => {
  const { path = [], locale = defaultLocale.code } = await props.params;

  const pathname = dynamicRouter.getPathname(path);

  return dynamicRouter.getPageMetadata(locale, pathname);
};

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

  // Determine which locales to include in the static export
  const locales = ENABLE_STATIC_EXPORT_LOCALE
    ? availableLocaleCodes
    : [defaultLocale.code];

  const routes = await Promise.all(
    // Gets all mapped routes to the Next.js Routing Engine by Locale
    locales.map((locale: string) => ({ locale }))
  );

  return routes.flat().sort();
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<DynamicParams> = async props => {
  const { path = [], locale = defaultLocale.code } = await props.params;

  if (!availableLocaleCodes.includes(locale)) {
    // Forces the current locale to be the Default Locale
    setRequestLocale(defaultLocale.code);

    if (!allLocaleCodes.includes(locale)) {
      // when the locale is not listed in the locales, return NotFound
      return notFound();
    }

    // Redirect to the default locale path
    const pathname = dynamicRouter.getPathname(path);

    return redirect(`/${defaultLocale.code}/${pathname}`);
  }

  // Configures the current Locale to be the given Locale of the Request
  setRequestLocale(locale);

  // Gets the current full pathname for a given path
  const pathname = dynamicRouter.getPathname(path);

  const staticGeneratedLayout = DYNAMIC_ROUTES.get(pathname);

  // If the current pathname is a statically generated route
  // it means it does not have a Markdown file nor exists under the filesystem
  // but it is a valid route with an assigned layout that should be rendered
  if (staticGeneratedLayout !== undefined) {
    // Metadata and shared Context to be available through the lifecycle of the page
    const sharedContext = { pathname: `/${pathname}` };

    // Defines a shared Server Context for the Client-Side
    // That is shared for all pages under the dynamic router
    setClientContext(sharedContext);

    // The Matter Provider allows Client-Side injection of the data
    // to a shared React Client Provider even though the page is rendered
    // within a server-side context
    return (
      <MatterProvider {...sharedContext}>
        <WithLayout layout={staticGeneratedLayout} />
      </MatterProvider>
    );
  }

  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    pathname
  );

  if (source.length && filename.length) {
    // This parses the source Markdown content and returns a React Component and
    // relevant context from the Markdown File
    const { content, frontmatter, headings, readingTime } =
      await dynamicRouter.getMDXContent(source, filename);

    // Metadata and shared Context to be available through the lifecycle of the page
    const sharedContext = {
      frontmatter: frontmatter,
      headings: headings,
      pathname: `/${pathname}`,
      readingTime: readingTime,
      filename: filename,
    };

    // Defines a shared Server Context for the Client-Side
    // That is shared for all pages under the dynamic router
    setClientContext(sharedContext);

    // The Matter Provider allows Client-Side injection of the data
    // to a shared React Client Provider even though the page is rendered
    // within a server-side context
    return (
      <MatterProvider {...sharedContext}>
        <WithLayout layout={frontmatter.layout}>{content}</WithLayout>
      </MatterProvider>
    );
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
