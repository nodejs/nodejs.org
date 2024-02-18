import { getTranslations } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { useClientContext } from '@/hooks/react-server';
import getReleaseData from '@/next-data/releaseData';
import ReleaseProvider from '@/providers/releaseProvider';

import LinkTabs from './Common/LinkTabs';

const getDownloadCategory = (pathname: string) => {
  const segments = pathname
    .replace('/new-design', '')
    .split('/')
    .filter(Boolean);
  const [, c] = segments;

  if (c === 'current' || typeof c === 'undefined') {
    segments.unshift('download');
  }

  const [page, category, subCategory] = segments;

  return { page, category, subCategory };
};

const WithDownloadCategories: FC<PropsWithChildren> = async ({ children }) => {
  const t = await getTranslations();
  const releases = await getReleaseData();
  const { pathname } = useClientContext();
  const { page, category, subCategory } = getDownloadCategory(pathname);

  const mapCategoriesToTabs = (categories: Array<Array<string>>) =>
    categories.map(([page, category, subCategory]) => ({
      key: category,
      label: t(`layouts.download.categories.${category}`),
      link:
        category === 'download'
          ? `/${[page, subCategory].join('/')}`
          : `/${[page, category, subCategory].join('/')}`,
    }));

  return (
    <ReleaseProvider releases={releases}>
      <LinkTabs
        label={t('layouts.download.selectCategory')}
        tabs={mapCategoriesToTabs([
          [page, 'download', subCategory],
          [page, 'package-manager', subCategory],
          [page, 'source-code', subCategory],
        ])}
        activeTab={category}
      >
        {children}
      </LinkTabs>
    </ReleaseProvider>
  );
};

export default WithDownloadCategories;
