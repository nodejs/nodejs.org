import { ENABLE_STATIC_EXPORT, NEXT_DATA_URL } from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';

const getReleaseData = (): Promise<NodeRelease[]> => {
  if (ENABLE_STATIC_EXPORT) {
    // Loads the data dynamically with lazy-loading to prevent data-generation
    // within the top level import
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
