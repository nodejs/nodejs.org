import { ENABLE_STATIC_EXPORT, NEXT_DATA_URL } from '@/next.constants.mjs';
import type { BlogDataRSC } from '@/types';

const getBlogData = (category: string): Promise<BlogDataRSC> => {
  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT) {
    return import('@/next-data/providers/blogData').then(
      ({ default: provideBlogData }) => provideBlogData(category)
    );
  }

  // When we're on RSC with Server capabilities we prefer using Next.js Data Fetching
  // as this will load cached data from the server instead of generating data on the fly
  // this is extremely useful for ISR and SSG as it will not generate this data on every request
  return fetch(`${NEXT_DATA_URL}blog-data/${category}`, {
    cache: 'no-cache',
  }).then(r => r.json());
};

export default getBlogData;
