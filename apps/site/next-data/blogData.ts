import {
  ENABLE_STATIC_EXPORT,
  IS_DEV_ENV,
  NEXT_DATA_URL,
  VERCEL_ENV,
  VERCEL_REGION,
} from '@/next.constants.mjs';
import type { BlogCategory, BlogPostsRSC } from '@/types';

const getBlogData = (
  cat: BlogCategory,
  page?: number
): Promise<BlogPostsRSC> => {
  const IS_NOT_VERCEL_RUNTIME_ENV =
    (!IS_DEV_ENV && VERCEL_ENV && !VERCEL_REGION) ||
    (!IS_DEV_ENV && !VERCEL_ENV);

  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT || IS_NOT_VERCEL_RUNTIME_ENV) {
    return import('@/next-data/providers/blogData').then(
      ({ provideBlogPosts, providePaginatedBlogPosts }) =>
        page ? providePaginatedBlogPosts(cat, page) : provideBlogPosts(cat)
    );
  }

  const fetchURL = `${NEXT_DATA_URL}blog-data/${cat}/${page ?? 0}`;

  // This data cannot be cached because it is continuously updated. Caching it would lead to
  // outdated information being shown to the user.
  return fetch(fetchURL)
    .then(response => response.text())
    .then(JSON.parse);
};

export default getBlogData;
