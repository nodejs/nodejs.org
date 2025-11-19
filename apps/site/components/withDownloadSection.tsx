import { getLocale } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { getClientContext } from '#site/client-context';
import WithNodeRelease from '#site/components/withNodeRelease';
import provideDownloadSnippets from '#site/next-data/providers/downloadSnippets';
import { defaultLocale } from '#site/next.locales.mjs';
import {
  ReleaseProvider,
  ReleasesProvider,
} from '#site/providers/releaseProvider';

import type { NodeRelease } from '../types';

type WithDownloadSectionProps = PropsWithChildren<{
  releases: Array<NodeRelease>;
}>;

const WithDownloadSection: FC<WithDownloadSectionProps> = async ({
  releases,
  children,
}) => {
  const locale = await getLocale();

  const snippets = await provideDownloadSnippets(locale);

  // By default the translated languages do not contain all the download snippets
  // Hence we always merge any translated snippet with the fallbacks for missing snippets
  const fallbackSnippets = await provideDownloadSnippets(defaultLocale.code);

  const { pathname } = getClientContext();

  // Some available translations do not have download snippets translated or have them partially translated
  // This aims to merge the available translated snippets with the fallback snippets
  const memoizedSnippets = fallbackSnippets
    .filter(snippet => !snippets.some(s => s.name === snippet.name))
    .concat(snippets);

  // Decides which initial release to use based on the current pathname
  const initialRelease = pathname.endsWith('/current')
    ? 'Current'
    : ['Active LTS' as const, 'Maintenance LTS' as const];

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
