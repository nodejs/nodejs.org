import {
  provideBlogPosts,
  providePaginatedBlogPosts,
} from '@/next-data/providers/blogData';
import { defaultLocale } from '@/next.locales.mjs';
import type { BlogCategory } from '@/types';

type DynamicStaticPaths = {
  locale: string;
  category: BlogCategory;
  page: string;
};
type StaticParams = { params: Promise<DynamicStaticPaths> };

// This is the Route Handler for the `GET` method which handles the request
// for providing Blog Posts for Blog Categories and Pagination Metadata
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, props: StaticParams) => {
  const params = await props.params;

  const requestedPage = Number(params.page);

  const data =
    requestedPage >= 1
      ? // This allows us to blindly get all blog posts from a given category
        // if the page number is 0 or something smaller than 1
        providePaginatedBlogPosts(params.category, requestedPage)
      : provideBlogPosts(params.category);

  return Response.json(data, { status: data.posts.length ? 200 : 404 });
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/blog-data/[category]/[page]` this will return a default value as we don't want to
// statically generate this route as it is compute-expensive.
// Hence we generate a "fake" OG image during build just to satisfy Next.js requirements.
export const generateStaticParams = async () => [
  { locale: defaultLocale.code, category: 'all', page: '0' },
];

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;
