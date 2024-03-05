'use client';

import type { FC } from 'react';

import type { BreadcrumbLink } from '@/components/Common/Breadcrumbs';
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

    const navigationTree = getSideNavigation([navigationKey as NavigationKeys]);

    const toCamelCase = (str: string) =>
      str
        .split('-')
        .map((word, index) =>
          index === 0 ? word : `${word[0].toUpperCase()}${word.slice(1)}`
        )
        .join('');

    const pathList = pathname
      .split('/')
      .filter(item => item !== '')
      .map(toCamelCase);

    return pathList.reduce(
      (acc, path) => {
        const currentNode = acc.currentNode.find(([key]) => key === path);
        if (currentNode) {
          const [, { label, link = '', items = [] }] = currentNode;
          if (label) {
            acc.result.push({ label, href: link });
          }
          acc.currentNode = items;
        }
        return acc;
      },
      {
        currentNode: navigationTree,
        result: [] as Array<BreadcrumbLink>,
      }
    ).result;
  };

  return (
    <Breadcrumbs links={getBreadrumbs()} maxLength={isMobileScreen ? 2 : 4} />
  );
};

export default WithBreadcrumbs;
