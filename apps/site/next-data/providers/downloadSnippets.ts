import { cache } from 'react';

import generateDownloadSnippets from '@/next-data/generators/downloadSnippets.mjs';

const downloadSnippets = await generateDownloadSnippets();

const provideDownloadSnippets = cache((language: string) => {
  if (downloadSnippets.has(language)) {
    return downloadSnippets.get(language)!;
  }

  return undefined;
});

export default provideDownloadSnippets;
