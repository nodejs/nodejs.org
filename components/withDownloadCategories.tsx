import { getTranslations } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { useClientContext } from '@/hooks/react-server';
import getReleaseData from '@/next-data/releaseData';
import { ReleaseProvider } from '@/providers/releaseProvider';
import type { NodeReleaseStatus } from '@/types';
import { getDownloadCategory, mapCategoriesToTabs } from '@/util/downloadUtils';

import LinkTabs from './Common/LinkTabs';
import WithNodeRelease from './withNodeRelease';

const WithDownloadCategories: FC<PropsWithChildren> = async ({ children }) => {
  const t = await getTranslations();
  const releases = await getReleaseData();

  const { pathname } = useClientContext();
  const { page, category, subCategory } = getDownloadCategory(pathname);

  const initialRelease: Array<NodeReleaseStatus> = pathname.includes('current')
    ? ['Current']
    : ['Active LTS', 'Maintenance LTS'];

  return (
    <LinkTabs
      activeTab={category}
      label={t('layouts.download.selectCategory')}
      tabs={mapCategoriesToTabs({
        page: page,
        categories: [
          {
            category: 'download',
            label: t('layouts.download.categories.download'),
          },
          {
            category: 'prebuilt-binaries',
            label: t('layouts.download.categories.prebuilt-binaries'),
          },
          {
            category: 'package-manager',
            label: t('layouts.download.categories.package-manager'),
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
          <ReleaseProvider initialRelease={release} releases={releases}>
            {children}
          </ReleaseProvider>
        )}
      </WithNodeRelease>
    </LinkTabs>
  );
};

export default WithDownloadCategories;
