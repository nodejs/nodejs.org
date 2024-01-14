import {
  provideBlogCategories,
  provideBlogPosts,
  providePaginatedBlogPosts,
} from '@/next-data/providers/blogData';
import { VERCEL_REVALIDATE } from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';

type StaticParams = {
  params: { locale: string; category: string; page: string };
};

// This is the Route Handler for the `GET` method which handles the request
// for providing Blog Posts for Blog Categories and Pagination Metadata
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, { params }: StaticParams) => {
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
// `[locale]/next-data/blog-data/[category]` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () => {
  // This metadata is the original list of all available categories and all available years
  // within the Node.js Website Blog Posts (2011, 2012...)
  const categories = provideBlogCategories();

  const mappedCategories = categories.map(category => {
    // gets the current pagination meta for a given category
    const { pagination } = provideBlogPosts(category);

    // creates a sequential array containing each page number
    const pages = [...Array(pagination.pages).keys()].map((_, key) => key + 1);

    // maps the data into valid Next.js Route Engine routes with all required params
    // notice that we add an extra 0 in the beginning in case we want a non-paginated route
    return [0, ...pages].map(page => ({
      locale: defaultLocale.code,
      page: String(page),
      category,
    }));
  });

  return mappedCategories.flat();
};

// Enforces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = VERCEL_REVALIDATE;
