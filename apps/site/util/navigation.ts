import { siteNavigation } from '#site/next.json.mjs';
import { dashToCamelCase } from '#site/util/string';

import type {
  IntlMessageKeys,
  NavigationEntry,
  NavigationKeys,
} from '#site/types';
import type { BreadcrumbLink } from '@node-core/ui-components/Common/Breadcrumbs';
import type { HTMLAttributeAnchorTarget } from 'react';

// Both `useTranslations` and `getTranslations` return a function of this shape
export type Translator = (key: IntlMessageKeys) => string;

export type NavigationItem = {
  key: string;
  label: string;
  link: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  accent?: boolean;
  items: Array<NavigationItem>;
};

const mapNavigation = (
  t: Translator,
  entries: Record<string, NavigationEntry>
): Array<NavigationItem> =>
  Object.entries(entries).map(
    ([key, { label, link = '', items = {}, target, accent }]) => ({
      key,
      label: label ? t(label) : '',
      link,
      target,
      accent,
      items: mapNavigation(t, items),
    })
  );

export const getTopNavigation = (t: Translator) =>
  mapNavigation(t, siteNavigation.topNavigation);

export const getSideNavigation = (t: Translator, keys: Array<NavigationKeys>) =>
  mapNavigation(
    t,
    Object.fromEntries(
      keys.map(key => [key, siteNavigation.sideNavigation[key]])
    )
  );

// Reduce the path to a breadcrumbs array by finding each segment in the current navigation layer,
// descending into the found node's items (next layer) for the next segment.
export const getBreadcrumbs = (
  navigation: Array<NavigationItem>,
  pathname: string
) => {
  const pathList = pathname
    .split('/')
    .filter(item => item !== '')
    .map(dashToCamelCase);

  let currentNode = navigation;

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
