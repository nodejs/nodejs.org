import { cache } from 'react';

import generateDownloadSnippets from '#site/next-data/generators/downloadSnippets.mjs';

const downloadSnippets = await generateDownloadSnippets();

const provideDownloadSnippets = cache((language: string) => {
  if (downloadSnippets.has(language)) {
    return downloadSnippets.get(language)!;
  }

  return [];
});

export default provideDownloadSnippets;
