import { useContext } from 'react';
import { useRouter } from 'next/router';

import { LocaleContext } from '../providers/localeProvider';
import { linkWithLocale } from '../util/linkWithLocale';

export const useLocale = () => {
  const { currentLocale, availableLocales } = useContext(LocaleContext);
  const { asPath } = useRouter();

  const localisedLink = linkWithLocale(currentLocale!.code);

  return {
    availableLocales,
    currentLocale: currentLocale!,
    isCurrentLocaleRoute: (route: string) => localisedLink(route) === asPath,
  };
};
