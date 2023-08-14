import { FormattedMessage } from 'react-intl';
import { siteNavigation } from '@/next.json.mjs';
import type { NavigationEntry, NavigationKeys } from '@/types';

// Translation Context for FormattedMessage
type Context = Record<string, Record<string, string | JSX.Element | undefined>>;

// Provides Context replacement for variables within the Link. This is also something that is not going
// to happen in the future with `nodejs/nodejs.dev` codebase
const replaceLinkWithContext = (
  link: string,
  context: Record<string, string | JSX.Element | undefined>
) =>
  Object.entries(context).reduce(
    (finalLink, [find, replace]) =>
      finalLink.replace(
        `{${find}}`,
        typeof replace === 'string' ? replace : ''
      ),
    link
  );

export const useNavigation = () => {
  const mapNavigationEntries = (
    entries: Record<string, NavigationEntry>,
    context?: Context
  ) => {
    const getContext = (key: string) => (context && context[key]) || {};

    const getFormattedMessage = (translationId: string, key: string) => (
      <FormattedMessage id={translationId} values={getContext(key)} />
    );

    return Object.entries(entries).map(([key, item]) => ({
      text: getFormattedMessage(item.translationId, key),
      link: replaceLinkWithContext(item.link, getContext(key)),
      key: key,
    }));
  };

  return {
    navigationItems: mapNavigationEntries(siteNavigation),
    getSideNavigation: (section: NavigationKeys, context?: Context) =>
      mapNavigationEntries(
        // We need the parent and their items when making a side navigation
        {
          [section]: siteNavigation[section],
          ...siteNavigation[section].items,
        },
        context
      ),
  };
};
