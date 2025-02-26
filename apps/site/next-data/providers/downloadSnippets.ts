import { cache } from 'react';

import generateDownloadSnippets from '@/next-data/generators/downloadSnippets.mjs';

const provideDownloadSnippets = cache(async (language: string) => {
  const downloadSnippets = await generateDownloadSnippets();

  if (downloadSnippets.has(language)) {
    return downloadSnippets.get(language)!;
  }

  return undefined;
});

export default provideDownloadSnippets;
