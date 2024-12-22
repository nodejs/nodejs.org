import {
  ENABLE_STATIC_EXPORT,
  IS_DEV_ENV,
  NEXT_DATA_URL,
  VERCEL_ENV,
} from '@/next.constants.mjs';
import type { BlogPostsRSC } from '@/types';

const getBlogData = (cat: string, page?: number): Promise<BlogPostsRSC> => {
  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT || (VERCEL_ENV !== 'production' && !IS_DEV_ENV)) {
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
