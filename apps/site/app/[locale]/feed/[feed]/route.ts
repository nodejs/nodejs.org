import { NextResponse } from 'next/server';

import { siteConfig } from '#site/next.json.mjs';
import { defaultLocale } from '#site/next.locales.mjs';
import { getFeeds } from '#site/util/feeds';

type DynamicStaticPaths = { locale: string; feed: string };
type StaticParams = { params: Promise<DynamicStaticPaths> };

// This is the Route Handler for the `GET` method which handles the request
// for the Node.js Website Blog Feeds (RSS)
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, props: StaticParams) => {
  const params = await props.params;

  // Generate the Feed for the given feed type (blog, releases, etc)
  const websiteFeed = getFeeds(params.feed);

  return new NextResponse(websiteFeed, {
    headers: { 'Content-Type': 'application/xml' },
    status: websiteFeed !== undefined ? 200 : 404,
  });
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/feeds/[feed]` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () =>
  siteConfig.rssFeeds.map(feed => ({
    locale: defaultLocale.code,
    feed: feed.file,
  }));

// Enforces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;
