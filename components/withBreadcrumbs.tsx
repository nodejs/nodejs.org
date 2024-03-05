'use client';

import type { FC } from 'react';

import type { BreadcrumbLink } from '@/components/Common/Breadcrumbs';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import { useClientContext, useMediaQuery, useSiteNavigation } from '@/hooks';
import type { NavigationKeys } from '@/types';
import { dashToCamelCase } from '@/util/stringUtils';

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
    const navigationTree = getSideNavigation([navigationKey as NavigationKeys]);
    const pathList = pathname
      .split('/')
      .filter(item => item !== '')
      .map(dashToCamelCase);

    let currentNode = navigationTree;

    return pathList.reduce((breadcrumbs, path) => {
      const foundNode = currentNode.find(([nodePath]) => nodePath === path);
      if (foundNode) {
        const [, { label, link = '', items = [] }] = foundNode;
        currentNode = items;
        return label ? [...breadcrumbs, { label, href: link }] : breadcrumbs;
      }
      return breadcrumbs;
    }, [] as Array<BreadcrumbLink>);
  };

  return (
    <Breadcrumbs links={getBreadrumbs()} maxLength={isMobileScreen ? 2 : 4} />
  );
};

export default WithBreadcrumbs;
