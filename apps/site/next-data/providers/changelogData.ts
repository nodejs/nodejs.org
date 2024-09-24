import { cache } from 'react';

import generateChangelogData from '@/next-data/generators/changelogData.mjs';

export const provideChangelogData = cache((version: string) => {
  const changelog = generateChangelogData(version);

  return changelog;
});
