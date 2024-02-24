import { getTranslations } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { useClientContext } from '@/hooks/react-server';
import getReleaseData from '@/next-data/releaseData';
import { ReleaseProvider } from '@/providers/releaseProvider';
import { getDownloadCategory, mapCategoriesToTabs } from '@/util/downloadUtils';

import LinkTabs from './Common/LinkTabs';

const WithDownloadCategories: FC<PropsWithChildren> = async ({ children }) => {
  const t = await getTranslations();
  const releases = await getReleaseData();

  const { pathname } = useClientContext();
  const { page, category, subCategory } = getDownloadCategory(pathname);

  return (
    <ReleaseProvider releases={releases}>
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
        {children}
      </LinkTabs>
    </ReleaseProvider>
  );
};

export default WithDownloadCategories;
