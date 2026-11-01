import { siteNavigation } from '#site/next.json.mjs';

import type {
  IntlMessageKeys,
  NavigationEntry,
  NavigationKeys,
} from '#site/types';
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
