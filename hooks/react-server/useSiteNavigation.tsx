import { useTranslations } from 'next-intl';
import type { RichTranslationValues } from 'next-intl';

import { siteNavigation } from '@/next.json.mjs';
import type {
  MappedNavigationEntry,
  NavigationEntry,
  NavigationKeys,
} from '@/types';

type Context = Record<string, RichTranslationValues>;
type Navigation = Record<string, NavigationEntry>;

// Provides Context replacement for variables within the Link. This is also something that is not going
// to happen in the future with `nodejs/nodejs.dev` codebase
const replaceLinkWithContext = (
  link: string,
  context?: RichTranslationValues
) =>
  Object.entries(context || {}).reduce(
    (finalLink, [find, replace]) =>
      finalLink.replace(
        `{${find}}`,
        typeof replace === 'string' ? replace : ''
      ),
    link
  );

const useSiteNavigation = () => {
  const t = useTranslations();

  const mapNavigationEntries = (
    entries: Navigation,
    context: Context = {},
    level = 0,
    includeItems = true
  ): MappedNavigationEntry[] => {
    const getFormattedMessage = (translationId: string, key: string) =>
      t.rich(translationId, context[key] || {});

    return Object.entries(entries).map(
      ([key, { translationId, link, items }]) => {
        const mappedEntry: MappedNavigationEntry = {
          text: getFormattedMessage(translationId, key),
          link: replaceLinkWithContext(link, context[key]),
          items: [],
          level,
          key,
        };

        if (includeItems && items) {
          mappedEntry.items = mapNavigationEntries(items, context, level + 1);
        }

        return mappedEntry;
      }
    );
  };

  const getSideNavigation = (section: NavigationKeys, context?: Context) => {
    const { items, translationId, link } = siteNavigation[section];

    return mapNavigationEntries(
      { [section]: { translationId, link }, ...items },
      context
    );
  };

  return {
    getSideNavigation,
    navigationItems: mapNavigationEntries(siteNavigation, {}, 0, false),
  };
};

export default useSiteNavigation;
