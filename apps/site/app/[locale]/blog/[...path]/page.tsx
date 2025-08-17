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

import * as basePage from '#site/app/[locale]/page';
import { provideBlogPosts } from '#site/next-data/providers/blogData';
import { ENABLE_STATIC_EXPORT } from '#site/next.constants.mjs';
import { blogData } from '#site/next.json.mjs';
import { defaultLocale } from '#site/next.locales.mjs';

type DynamicStaticPaths = { path: Array<string>; locale: string };
type DynamicParams = { params: Promise<DynamicStaticPaths> };

/**
 * This is a list of all static routes or pages from the Website that we do not
 * want to allow to be statically built on our Static Export Build.
 */
const BLOG_DYNAMIC_ROUTES = blogData.categories.flatMap(category => {
  // Each category can have multiple pages, so we generate a route for each page
  const categoryPages = provideBlogPosts(category).pagination.pages;

  const categoryRoutes = Array.from({ length: categoryPages }, (_, page) => ({
    locale: defaultLocale.code,
    path: [category, `${category}/page/${page + 1}`],
  }));

  return [{ locale: defaultLocale.code, path: [category] }, ...categoryRoutes];
});

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

  return BLOG_DYNAMIC_ROUTES;
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<DynamicParams> = async props => {
  // Gets the current full pathname for a given path
  const [locale, pathname] = await basePage.getLocaleAndPath(props);

  const isDynamicRoute = BLOG_DYNAMIC_ROUTES.some(route =>
    route.path.includes(pathname)
  );

  // Gets the Markdown content and context for Blog pages
  // otherwise this is likely a blog-category or a blog post
  const [content, context] = await basePage.getMarkdownContext(
    locale,
    `blog/${pathname}`
  );

  // If this isn't a valid dynamic route for blog post or there's no mardown file
  // for this, then we fail as not found as there's nothing we can do.
  if (isDynamicRoute || context.filename) {
    return basePage.renderPage({
      content: content,
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
