'use cache';

import generateDownloadSnippets from '#site/next-data/generators/downloadSnippets.mjs';

const provideDownloadSnippets = async (language: string) => {
  const downloadSnippets = await generateDownloadSnippets();

  if (downloadSnippets.has(language)) {
    return downloadSnippets.get(language)!;
  }

  return [];
};

export default provideDownloadSnippets;
