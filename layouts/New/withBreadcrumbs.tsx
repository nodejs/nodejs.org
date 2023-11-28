'use client';

import type { FC } from 'react';

import Breadcrumbs from '@/components/Common/Breadcrumbs';
import { useClientContext, useMediaQuery, useSiteNavigation } from '@/hooks';
import type { NavigationKeys } from '@/types';

const WithBreadcrumbs: FC = () => {
  const { navigationItems, getSideNavigation } = useSiteNavigation();
  const { pathname } = useClientContext();

  const isMobileScreen = useMediaQuery('(max-width: 639px)');

  const getBreadrumbs = () => {
    const [navigationKey] =
      navigationItems.find(([, item]) => pathname.includes(item.link)) || [];

    if (navigationKey === undefined) {
      return [];
    }

    return getSideNavigation([navigationKey as NavigationKeys])
      .map(([, item]) => item.items)
      .flat()
      .filter(([, item]) => pathname.includes(item.link))
      .map(([, item]) => ({ label: item.label, href: item.link }));
  };

  return (
    <Breadcrumbs links={getBreadrumbs()} maxLength={isMobileScreen ? 2 : 4} />
  );
};

export default WithBreadcrumbs;
