import BreadcrumbsContainer from '@node-core/ui-components/Common/Breadcrumbs';
import { getTranslations } from 'next-intl/server';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import { getSideNavigation } from '#site/util/navigation';
import { dashToCamelCase } from '#site/util/string';

import type { NavigationKeys } from '#site/types';
import type { NavigationItem } from '#site/util/navigation';
import type { BreadcrumbLink } from '@node-core/ui-components/Common/Breadcrumbs';
import type { FC } from 'react';

type BreadcrumbsProps = {
  navKeys?: Array<NavigationKeys>;
};

// Reduce the path to a breadcrumbs array by finding each segment in the current navigation layer,
// descending into the found node's items (next layer) for the next segment.
const getBreadcrumbs = (
  navigationTree: Array<NavigationItem>,
  pathname: string
) => {
  const pathList = pathname
    .split('/')
    .filter(item => item !== '')
    .map(dashToCamelCase);

  let currentNode = navigationTree;

  return pathList.reduce((breadcrumbs, path, index) => {
    const nodeWithCurrentPath = currentNode.find(
      entry =>
        // Checking link in cases where nodePath cannot = path. Like 'discoverJavaScriptTimers'
        (entry.key === path || entry.link === pathname) &&
        // Skip checking child path if it is the last path since there is no more child item inside
        (index === pathList.length - 1 ||
          entry.items.some(
            child =>
              child.key === pathList[index + 1] || child.link === pathname
          ))
    );

    if (nodeWithCurrentPath) {
      const { label, link, items } = nodeWithCurrentPath;

      // Goes deeper on the tree of items if there are any.
      currentNode = items;

      return label ? [...breadcrumbs, { label, href: link }] : breadcrumbs;
    }

    return breadcrumbs;
  }, [] as Array<BreadcrumbLink>);
};

const Breadcrumbs: FC<BreadcrumbsProps> = async ({ navKeys = [] }) => {
  const t = await getTranslations();
  const { pathname } = getClientContext();

  return (
    <BreadcrumbsContainer
      links={getBreadcrumbs(getSideNavigation(t, navKeys), pathname)}
      maxLength={4}
      mobileMaxLength={2}
      as={Link}
      homeLinkAriaLabel={t('components.common.breadcrumbs.navigateToHome')}
    />
  );
};

export default Breadcrumbs;
