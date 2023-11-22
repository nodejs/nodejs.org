import provideBlogData from '@/next-data/providers/blogData';
import { defaultLocale } from '@/next.locales.mjs';

// We only support fetching these pages from the /en/ locale code
const locale = defaultLocale.code;

type StaticParams = { params: { category: string; locale: string } };

// This is the Route Handler for the `GET` method which handles the request
// for generating our static data for the Node.js Website
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, { params }: StaticParams) => {
  const { posts, pagination } = await provideBlogData(params.category);

  return Response.json(
    { posts, pagination },
    { status: posts.length ? 200 : 404 }
  );
};

// This function generates the static paths that come from the dynamic segments
// `en/next-data/[type]` and returns an array of all available static paths
// this is useful for static exports, for example.
// Note that differently from the App Router these don't get built at the build time
// only if the export is already set for static export
export const generateStaticParams = async () => {
  const {
    meta: { categories, pagination },
  } = await provideBlogData();

  return [
    ...categories.map(category => ({ category, locale })),
    ...pagination.map(year => ({ category: `year-${year}`, locale })),
  ];
};

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
