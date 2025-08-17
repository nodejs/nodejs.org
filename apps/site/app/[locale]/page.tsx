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
import type { FC, ReactNode } from 'react';

import { setClientContext } from '#site/client-context';
import WithLayout from '#site/components/withLayout';
import { ENABLE_STATIC_EXPORT } from '#site/next.constants.mjs';
import { ENABLE_STATIC_EXPORT_LOCALE } from '#site/next.constants.mjs';
import { PAGE_VIEWPORT } from '#site/next.dynamic.constants.mjs';
import { dynamicRouter } from '#site/next.dynamic.mjs';
import { allLocaleCodes, availableLocaleCodes } from '#site/next.locales.mjs';
import { defaultLocale } from '#site/next.locales.mjs';
import { MatterProvider } from '#site/providers/matterProvider';
import type { Layouts } from '#site/types/layouts';
import type { ClientSharedServerContext } from '#site/types/server';

type DynamicStaticPaths = { path: Array<string>; locale: string };
type DynamicParams = { params: Promise<DynamicStaticPaths> };

type DynamicPageRender = {
  content: ReactNode;
  layout: Layouts;
  context: Partial<ClientSharedServerContext>;
};

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = () => ({ ...PAGE_VIEWPORT });

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

// This method is used for retrieving the current locale and pathname from the request
export const getLocaleAndPath = async (props: DynamicParams) => {
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
  return [locale, dynamicRouter.getPathname(path)] as const;
};

// This method is used for retrieving the Markdown content and context
export const getMarkdownContext = async (locale: string, pathname: string) => {
  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    pathname
  );

  // This parses the source Markdown content and returns a React Component and
  // relevant context from the Markdown File
  const { content, frontmatter, headings, readingTime } =
    await dynamicRouter.getMDXContent(source, filename);

  // Metadata and shared Context to be available through the lifecycle of the page
  const context = {
    frontmatter: frontmatter,
    headings: headings,
    pathname: `/${pathname}`,
    readingTime: readingTime,
    filename: filename,
  };

  return [content, context] as const;
};

// This method is used for rendering the actual page
export const renderPage: FC<DynamicPageRender> = props => {
  // Defines a shared Server Context for the Client-Side
  // That is shared for all pages under the dynamic router
  setClientContext(props.context);

  // The Matter Provider allows Client-Side injection of the data
  // to a shared React Client Provider even though the page is rendered
  // within a server-side context
  return (
    <MatterProvider {...props.context}>
      <WithLayout layout={props.layout}>{props.content}</WithLayout>
    </MatterProvider>
  );
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<DynamicParams> = async props => {
  // Gets the current full pathname for a given path
  const [locale, pathname] = await getLocaleAndPath(props);

  // Gets the Markdown content and context
  const [content, context] = await getMarkdownContext(locale, pathname);

  // If we have a filename and layout then we have a page
  if (context.filename && context.frontmatter.layout) {
    return renderPage({
      content: content,
      layout: context.frontmatter.layout,
      context: context,
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
