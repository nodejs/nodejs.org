import { useTranslations } from 'next-intl';
import type { RichTranslationValues } from 'next-intl';

import { siteNavigation } from '@/next.json.mjs';
import type {
  FormattedMessage,
  NavigationEntry,
  NavigationKeys,
} from '@/types';

type Context = Record<string, RichTranslationValues>;
type Navigation = Record<string, NavigationEntry>;

interface MappedNavigationEntry {
  items: Array<[string, MappedNavigationEntry]>;
  label: FormattedMessage;
  link: string;
}

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

  const mapNavigationEntries = (entries: Navigation, context: Context = {}) => {
    const getFormattedMessage = (label: string, key: string) =>
      t.rich(label, context[key] || {});

    return Object.entries(entries).map(
      ([key, { label, link, items }]): [string, MappedNavigationEntry] => [
        key,
        {
          label: label ? getFormattedMessage(label, key) : '',
          link: link ? replaceLinkWithContext(link, context[key]) : '',
          items: items ? mapNavigationEntries(items, context) : [],
        },
      ]
    );
  };

  const getSideNavigation = (
    keys: Array<NavigationKeys>,
    context: Context = {}
  ) => {
    const navigationEntries: Navigation = keys.reduce(
      (acc, key) => ({ ...acc, [key]: siteNavigation.sideNavigation[key] }),
      {}
    );

    return mapNavigationEntries(navigationEntries, context);
  };

  const navigationItems = mapNavigationEntries(siteNavigation.topNavigation);

  return { getSideNavigation, navigationItems };
};

export default useSiteNavigation;
