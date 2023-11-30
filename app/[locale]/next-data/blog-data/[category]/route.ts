import provideBlogData from '@/next-data/providers/blogData';
import { VERCEL_REVALIDATE } from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';

// We only support fetching these pages from the /en/ locale code
const locale = defaultLocale.code;

type StaticParams = { params: { category: string; locale: string } };

// This is the Route Handler for the `GET` method which handles the request
// for providing Blog Posts, Pagination for every supported Blog Category
// this includes the `year-XXXX` categories for yearly archives (pagination)
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, { params }: StaticParams) => {
  const { posts, pagination } = await provideBlogData(params.category);

  return Response.json(
    { posts, pagination },
    { status: posts.length ? 200 : 404 }
  );
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/blog-data/[category]` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () => {
  // This metadata is the original list of all available categories and all available years
  // within the Node.js Website Blog Posts (2011, 2012...)
  const { meta } = await provideBlogData();

  return [
    ...meta.categories.map(category => ({ category, locale })),
    ...meta.pagination.map(year => ({ category: `year-${year}`, locale })),
  ];
};

// Forces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = VERCEL_REVALIDATE;
