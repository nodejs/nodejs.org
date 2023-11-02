import { useTranslations } from 'next-intl';
import type { RichTranslationValues } from 'next-intl';
import { useMemo } from 'react';

import { siteNavigation } from '@/next.json.mjs';
import type { NavigationEntry, NavigationKeys } from '@/types';

// These are mapped navigation entries. Navigation Entries can have sub-entries
type MappedItems = {
  text: ReturnType<ReturnType<typeof useTranslations>['rich']>;
  link: string;
  key: string;
  level: number;
  items: MappedItems[];
};

// Provides Context replacement for variables within the Link. This is also something that is not going
// to happen in the future with `nodejs/nodejs.dev` codebase
const replaceLinkWithContext = (link: string, context: RichTranslationValues) =>
  Object.entries(context).reduce(
    (finalLink, [find, replace]) =>
      finalLink.replace(
        `{${find}}`,
        typeof replace === 'string' ? replace : ''
      ),
    link
  );

const useBaseSiteNavigation = () => {
  const t = useTranslations();

  const mapNavigationEntries = (
    entries: Record<string, NavigationEntry>,
    context?: Record<string, RichTranslationValues>,
    level = 0
  ): MappedItems[] => {
    const getContext = (key: string) => (context && context[key]) || {};

    const getFormattedMessage = (translationId: string, key: string) =>
      t.rich(translationId, getContext(key));

    return Object.entries(entries).map(([key, item]) => ({
      text: getFormattedMessage(item.translationId, key),
      link: replaceLinkWithContext(item.link, getContext(key)),
      items: item.items
        ? mapNavigationEntries(item.items, context, level + 1)
        : [],
      level,
      key: key,
    }));
  };

  const rootNavigationItems = useMemo(
    () =>
      Object.entries(siteNavigation).reduce(
        (acc, [key, { translationId, link }]) => ({
          ...acc,
          [key]: { translationId, link },
        }),
        {}
      ),
    []
  );

  return {
    navigationItems: mapNavigationEntries(rootNavigationItems),
    getSideNavigation: (
      section: NavigationKeys,
      context?: Record<string, RichTranslationValues>
    ) => {
      const { items, translationId, link } = siteNavigation[section];

      return mapNavigationEntries(
        { [section]: { translationId, link }, ...items },
        context
      );
    },
  };
};

export default useBaseSiteNavigation;
