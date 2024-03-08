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

  const maxLength = isMobileScreen ? 2 : 4;

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

    // Reduce the pathList to a breadcrumbs array by finding each path in the current navigation layer,
    // updating the currentNode to the found node's items(next layer) for the next iteration.
    return pathList.reduce((breadcrumbs, path) => {
      const nodeWithCurrentPath = currentNode.find(
        ([nodePath]) => nodePath === path
      );

      if (nodeWithCurrentPath) {
        const [, { label, link = '', items = [] }] = nodeWithCurrentPath;

        // Goes deeper on the tree of items if there are any.
        currentNode = items;

        return label ? [...breadcrumbs, { label, href: link }] : breadcrumbs;
      }

      return breadcrumbs;
    }, [] as Array<BreadcrumbLink>);
  };

  return <Breadcrumbs links={getBreadrumbs()} maxLength={maxLength} />;
};

export default WithBreadcrumbs;
