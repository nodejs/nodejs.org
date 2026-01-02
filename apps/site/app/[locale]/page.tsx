/**
 * This file extends on the `page.tsx` file, which is the default file that is used to render
 * the entry points for each locale and then also reused within the [...path] route to render the
 * and contains all logic for rendering our dynamic and static routes within the Node.js Website.
 *
 * Note: that each `page.tsx` should have its own `generateStaticParams` to prevent clash of
 * dynamic params, which will lead on static export errors and other sort of issues.
 */

import { sep } from 'node:path';

import { availableLocaleCodes, defaultLocale } from '@node-core/website-i18n';
import { notFound } from 'next/navigation';

import {
  ENABLE_STATIC_EXPORT,
  ENABLE_STATIC_EXPORT_LOCALE,
} from '#site/next.constants.mjs';
import { allRoutes, getMarkdownFile } from '#site/router';
import { renderPage } from '#site/router/render';
import { joinNested } from '#site/util/array';

import type { PageParams } from '#site/router/page';
import type { FC } from 'react';

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

  return locales.map((locale: string) =>
    allRoutes.map(path => ({
      locale,
      path: path.split(sep),
    }))
  );
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<PageParams> = async props => {
  const { path = [], locale } = await props.params;

  const markdown = await getMarkdownFile(locale, joinNested(path));

  return markdown ? renderPage(markdown) : notFound();
};

export default getPage;
export * from '#site/router/page';
