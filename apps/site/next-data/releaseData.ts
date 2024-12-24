import {
  ENABLE_STATIC_EXPORT,
  IS_DEV_ENV,
  NEXT_DATA_URL,
  VERCEL_ENV,
  VERCEL_REGION,
} from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';

const getReleaseData = (): Promise<Array<NodeRelease>> => {
  const IS_NOT_VERCEL_RUNTIME_ENV =
    (!IS_DEV_ENV && VERCEL_ENV && !VERCEL_REGION) ||
    (!IS_DEV_ENV && !VERCEL_ENV);

  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT || IS_NOT_VERCEL_RUNTIME_ENV) {
    return import('@/next-data/providers/releaseData').then(
      ({ default: provideReleaseData }) => provideReleaseData()
    );
  }

  const fetchURL = `${NEXT_DATA_URL}release-data`;

  // This data cannot be cached because it is continuously updated. Caching it would lead to
  // outdated information being shown to the user.
  // Note: We do manual JSON.parse after response.text() to prevent React from throwing an Error
  // that does not provide a clear stack trace of which request is failing and what the JSON.parse error is
  return fetch(fetchURL)
    .then(response => response.text())
    .then(JSON.parse);
};

export default getReleaseData;
