import { getLocale, getTranslations } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import LinkTabs from '@/components/Common/LinkTabs';
import WithNodeRelease from '@/components/withNodeRelease';
import { useClientContext } from '@/hooks/react-server';
import getDownloadSnippets from '@/next-data/downloadSnippets';
import getReleaseData from '@/next-data/releaseData';
import { defaultLocale } from '@/next.locales.mjs';
import { ReleaseProvider } from '@/providers/releaseProvider';
import type { NodeReleaseStatus } from '@/types';
import { getDownloadCategory, mapCategoriesToTabs } from '@/util/downloadUtils';

// By default the translated languages do not contain all the download snippets
const fallbackSnippets = await getDownloadSnippets(defaultLocale.code);

const WithDownloadCategories: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const releases = await getReleaseData();
  const snippets = await getDownloadSnippets(locale);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useClientContext();
  const { page, category, subCategory } = getDownloadCategory(pathname);

  const initialRelease: NodeReleaseStatus = pathname.includes('current')
    ? 'Current'
    : 'LTS';

  // Some available translations do not have download snippets translated or have them partially translated
  // This aims to merge the available translated snippets with the fallback snippets
  const memoizedSnippets = fallbackSnippets
    .filter(snippet => !snippets.some(s => s.name === snippet.name))
    .concat(snippets);

  return (
    <LinkTabs
      activeTab={category}
      label={t('layouts.download.selectCategory')}
      tabs={mapCategoriesToTabs({
        page: page,
        categories: [
          {
            category: 'package-manager',
            label: t('layouts.download.categories.package-manager'),
          },
          {
            category: 'prebuilt-installer',
            label: t('layouts.download.categories.prebuilt-installer'),
          },
          {
            category: 'prebuilt-binaries',
            label: t('layouts.download.categories.prebuilt-binaries'),
          },
          {
            category: 'source-code',
            label: t('layouts.download.categories.source-code'),
          },
        ],
        subCategory: subCategory,
      })}
    >
      <WithNodeRelease status={initialRelease}>
        {({ release }) => (
          <ReleaseProvider
            initialRelease={release}
            releases={releases}
            snippets={memoizedSnippets}
          >
            {children}
          </ReleaseProvider>
        )}
      </WithNodeRelease>
    </LinkTabs>
  );
};

export default WithDownloadCategories;
