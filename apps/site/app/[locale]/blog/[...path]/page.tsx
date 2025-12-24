import { defaultLocale } from '@node-core/website-i18n';
import { notFound } from 'next/navigation';

import { ENABLE_STATIC_EXPORT } from '#site/next.constants.mjs';
import { BLOG_DYNAMIC_ROUTES } from '#site/next.dynamic.constants.mjs';
import * as basePage from '#site/next.dynamic.page.mjs';

import type { DynamicParams } from '#site/types';
import type { FC } from 'react';

type PageParams = DynamicParams<{ path: Array<string> }>;

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = basePage.generateViewport;

// This generates each page's HTML Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const generateMetadata = ({ params }: PageParams) =>
  basePage.generateMetadata({ params, prefix: 'blog' });

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

  return BLOG_DYNAMIC_ROUTES.map(pathname => ({
    locale: defaultLocale.code,
    path: pathname.split('/'),
  }));
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<PageParams> = async props => {
  const { path, locale: routeLocale } = await props.params;

  // Gets the current full pathname for a given path
  const [locale, pathname] = basePage.getLocaleAndPath(path, routeLocale);

  // Verifies if the current route is a dynamic route
  const isDynamicRoute = BLOG_DYNAMIC_ROUTES.some(r => r.includes(pathname));

  // Gets the Markdown content and context for Blog pages
  // otherwise this is likely a blog-category or a blog post
  const [content, context] = await basePage.getMarkdownContext({
    locale,
    pathname: `blog/${pathname}`,
  });

  // If this isn't a valid dynamic route for blog post or there's no markdown file
  // for this, then we fail as not found as there's nothing we can do.
  if (isDynamicRoute || context.filename) {
    return basePage.renderPage({
      content,
      layout: context.frontmatter.layout ?? 'blog-category',
      context: { ...context, pathname: `/blog/${pathname}` },
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
