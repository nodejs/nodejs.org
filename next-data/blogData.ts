import {
  ENABLE_STATIC_EXPORT,
  IS_DEVELOPMENT,
  NEXT_DATA_URL,
  VERCEL_ENV,
} from '@/next.constants.mjs';
import type { BlogPostsRSC } from '@/types';

const getBlogData = (cat: string, page?: number): Promise<BlogPostsRSC> => {
  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT || (!IS_DEVELOPMENT && !VERCEL_ENV)) {
    return import('@/next-data/providers/blogData').then(
      ({ provideBlogPosts, providePaginatedBlogPosts }) =>
        page ? providePaginatedBlogPosts(cat, page) : provideBlogPosts(cat)
    );
  }

  const fetchURL = page
    ? // Provides a conditional fetch URL based on the given function parameters
      `${NEXT_DATA_URL}blog-data/${cat}/${page}`
    : `${NEXT_DATA_URL}blog-data/${cat}`;

  // When we're on RSC with Server capabilities we prefer using Next.js Data Fetching
  // as this will load cached data from the server instead of generating data on the fly
  // this is extremely useful for ISR and SSG as it will not generate this data on every request
  return fetch(fetchURL).then(r => r.json());
};

export default getBlogData;
