'use client';

import type { BreadcrumbLink } from '@node-core/ui-components/Common/Breadcrumbs';
import Breadcrumbs from '@node-core/ui-components/Common/Breadcrumbs';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { useClientContext, useMediaQuery, useSiteNavigation } from '@/hooks';
import type { NavigationKeys } from '@/types';
import { dashToCamelCase } from '@/util/stringUtils';

type WithBreadcrumbsProps = {
  navKeys?: Array<NavigationKeys>;
};

const WithBreadcrumbs: FC<WithBreadcrumbsProps> = ({ navKeys = [] }) => {
  const { getSideNavigation } = useSiteNavigation();
  const t = useTranslations();
  const { pathname } = useClientContext();
  const isMobileScreen = useMediaQuery('(max-width: 639px)');

  const maxLength = isMobileScreen ? 2 : 4;

  const getBreadcrumbs = () => {
    const navigationTree = getSideNavigation(navKeys);

    const pathList = pathname
      .split('/')
      .filter(item => item !== '')
      .map(dashToCamelCase);

    let currentNode = navigationTree;

    // Reduce the pathList to a breadcrumbs array by finding each path in the current navigation layer,
    // updating the currentNode to the found node's items(next layer) for the next iteration.
    return pathList.reduce((breadcrumbs, path, index) => {
      const nodeWithCurrentPath = currentNode.find(
        ([nodePath, entry]) =>
          // Checking link in cases where nodePath cannot = path. Like 'discoverJavaScriptTimers'
          (nodePath === path || entry.link === pathname) &&
          // Skip checking child path if it is the last path since there is no more child item inside
          (index === pathList.length - 1 ||
            entry.items.some(
              ([childPath, entry]) =>
                childPath === pathList[index + 1] || entry.link === pathname
            ))
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

  return (
    <Breadcrumbs
      links={getBreadcrumbs()}
      maxLength={maxLength}
      as={Link}
      homeLinkAriaLabel={t('components.common.breadcrumbs.navigateToHome')}
    />
  );
};

export default WithBreadcrumbs;
