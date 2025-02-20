import { getLocale } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { getClientContext } from '@/client-context';
import WithNodeRelease from '@/components/withNodeRelease';
import getDownloadSnippets from '@/next-data/downloadSnippets';
import getReleaseData from '@/next-data/releaseData';
import { defaultLocale } from '@/next.locales.mjs';
import { ReleaseProvider, ReleasesProvider } from '@/providers/releaseProvider';
import type { DownloadSnippet } from '@/types';

// By default the translated languages do not contain all the download snippets
// Hence we always merge any translated snippet with the fallbacks for missing snippets
let fallbackSnippets: Array<DownloadSnippet>;

const WithDownloadSection: FC<PropsWithChildren> = async ({ children }) => {
  fallbackSnippets ??= await getDownloadSnippets(defaultLocale.code);

  const locale = await getLocale();
  const releases = await getReleaseData();
  const snippets = await getDownloadSnippets(locale);
  const { pathname } = getClientContext();

  // Some available translations do not have download snippets translated or have them partially translated
  // This aims to merge the available translated snippets with the fallback snippets
  const memoizedSnippets = fallbackSnippets
    .filter(snippet => !snippets.some(s => s.name === snippet.name))
    .concat(snippets);

  // Decides which initial release to use based on the current pathname
  const initialRelease = pathname.endsWith('/current') ? 'Current' : 'LTS';

  return (
    <WithNodeRelease status={initialRelease}>
      {({ release }) => (
        <ReleasesProvider releases={releases} snippets={memoizedSnippets}>
          <ReleaseProvider initialRelease={release}>{children}</ReleaseProvider>
        </ReleasesProvider>
      )}
    </WithNodeRelease>
  );
};

export default WithDownloadSection;
