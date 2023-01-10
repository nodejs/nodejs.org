import { FormattedMessage } from 'react-intl';

import type { NavigationEntry, NavigationKeys } from '../types';

import navigation from '../navigation.json';

// Translation Context for FormattedMessage
type Context = Record<string, Record<string, string>>;

export const useNavigation = () => {
  const mapNavigationEntries = (
    entries: Record<string, NavigationEntry>,
    context?: Context
  ) => {
    const getFormattedMessage = (translationId: string, key: string) => (
      <FormattedMessage
        id={translationId}
        values={(context && context[key]) || {}}
      />
    );

    return Object.entries(entries).map(([key, item]) => ({
      text: getFormattedMessage(item.translationId, key),
      link: item.link,
    }));
  };

  return {
    navigationItems: mapNavigationEntries(navigation),
    getSideNavigation: (section: NavigationKeys, context?: Context) =>
      mapNavigationEntries(
        // We need the parent and their items when making a side navigation
        { [section]: navigation[section], ...navigation[section].items },
        context
      ),
  };
};
