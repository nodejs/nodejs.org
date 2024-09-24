import {
  ENABLE_STATIC_EXPORT,
  IS_DEVELOPMENT,
  NEXT_DATA_URL,
  VERCEL_ENV,
} from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';

const getReleaseData = (): Promise<Array<NodeRelease>> => {
  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT || (!IS_DEVELOPMENT && !VERCEL_ENV)) {
    return import('@/next-data/providers/releaseData').then(
      ({ default: provideReleaseData }) => provideReleaseData()
    );
  }

  // When we're on RSC with Server capabilities we prefer using Next.js Data Fetching
  // as this will load cached data from the server instead of generating data on the fly
  // this is extremely useful for ISR and SSG as it will not generate this data on every request
  return fetch(`${NEXT_DATA_URL}release-data`).then(r => r.json());
};

export default getReleaseData;
