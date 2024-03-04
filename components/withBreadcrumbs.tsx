'use client';

import type { FC } from 'react';

import Breadcrumbs from '@/components/Common/Breadcrumbs';
import { useClientContext, useMediaQuery, useSiteNavigation } from '@/hooks';
import type { MappedNavigationEntry } from '@/hooks/react-generic/useSiteNavigation';
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

    const navigationTree: Array<[string, MappedNavigationEntry]> =
      getSideNavigation([navigationKey as NavigationKeys]);

    const toCamelCase = (str: string) => {
      return str
        .split('-')
        .map((word, index) =>
          index === 0 ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join('');
    };

    const pathList = pathname
      .split('/')
      .filter(item => {
        return item !== '';
      })
      .map(path => {
        return toCamelCase(path);
      });

    const findPathInTree = (
      pathList: Array<string>,
      tree: Array<[string, MappedNavigationEntry]>
    ) => {
      let currentNode = tree;
      const result = [];
      for (let i = 0; i < pathList.length; i++) {
        let found = false;
        for (let j = 0; j < currentNode.length; j++) {
          const [key, value] = currentNode[j];
          if (key === pathList[i]) {
            result.push({
              label: value.label,
              href: value.link || '',
            });
            currentNode = value.items;
            found = true;
            break;
          }
        }
        if (!found) break;
      }
      return result;
    };

    return findPathInTree(pathList, navigationTree).filter(item => {
      return item.label !== '';
    });
  };

  return (
    <Breadcrumbs links={getBreadrumbs()} maxLength={isMobileScreen ? 2 : 4} />
  );
};

export default WithBreadcrumbs;
