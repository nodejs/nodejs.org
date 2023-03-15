import { useContext } from 'react';
import { useRouter } from 'next/router';

import { LocaleContext } from '../providers/localeProvider';
import { linkWithLocale } from '../util/linkWithLocale';

export const useLocale = () => {
  const { currentLocale, availableLocales } = useContext(LocaleContext);
  const { asPath } = useRouter();

  const LocalizedLink = linkWithLocale(currentLocale!.code);

  const localisedPath = (route: string) =>
    LocalizedLink(route).replace(/[#|?].*$/, '');

  return {
    availableLocales: availableLocales!,
    currentLocale: currentLocale!,
    isCurrentLocaleRoute: (route: string, allowSubPath?: boolean) => {
      const localisedRoute = localisedPath(route);
      const asPathJustPath = asPath.replace(/[#|?].*$/, '');

      return allowSubPath
        ? asPathJustPath.startsWith(localisedRoute)
        : localisedRoute === asPathJustPath;
    },
  };
};
