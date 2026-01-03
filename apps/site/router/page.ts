import { defaultLocale } from '@node-core/website-i18n';

import { joinNested } from '#site/util/array';

import type { DynamicParams } from '#site/types/page';
import type { Metadata } from 'next';

import { PAGE_VIEWPORT } from './constants';

import { getPageMetadata } from '.';

/**
 * This is the default Viewport Metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
 */
export const generateViewport = () => PAGE_VIEWPORT;

export type PageParams = DynamicParams<{ path: Array<string> }> & {
  prefix?: string;
};

/**
 * This generates each page's HTML Metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const generateMetadata = async ({
  params,
  prefix,
}: PageParams): Promise<Metadata> => {
  const { path = [], locale = defaultLocale.code } = await params;

  return getPageMetadata(locale, joinNested(prefix, path));
};

// Enforces that this route is used as static rendering
// Except whenever on the Development mode as we want instant-refresh when making changes
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;
