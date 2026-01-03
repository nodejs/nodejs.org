import { defaultLocale } from '@node-core/website-i18n';
import { notFound } from 'next/navigation';

import { ENABLE_STATIC_EXPORT } from '#site/next.constants.mjs';
import { blogData } from '#site/next.json.mjs';
import { getMarkdownFile } from '#site/router';
import { BLOG_DYNAMIC_ROUTES } from '#site/router/constants';
import { renderPage } from '#site/router/render';

import type { DynamicParams } from '#site/types';
import type { FC } from 'react';

type PageParams = DynamicParams<{ cat: string }>;

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

  return blogData.categories.map(cat => ({
    locale: defaultLocale.code,
    cat,
  }));
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<PageParams> = async props => {
  const { cat, locale } = await props.params;

  // Verifies if the current route is a dynamic route
  const isDynamicRoute = BLOG_DYNAMIC_ROUTES.some(r => r.includes(cat));

  if (isDynamicRoute) {
    const file = (await getMarkdownFile(locale, 'blog'))!;
    file.pathname = `/blog/${cat}`;

    return renderPage(file);
  }

  return notFound();
};

export * from '../../page';
export default getPage;
