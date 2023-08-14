import { useContext } from 'react';
import { useRouter } from './useRouter';
import { LocaleContext } from '@/providers/localeProvider';
import { linkWithLocale } from '@/util/linkWithLocale';

export const useLocale = () => {
  const { asPath } = useRouter();

  const { currentLocale, availableLocales, defaultLocale } =
    useContext(LocaleContext);

  const localizedLink = linkWithLocale(currentLocale.code);

  const localisedPath = (route: string) =>
    localizedLink(route).replace(/[#|?].*$/, '');

  return {
    availableLocales,
    currentLocale,
    defaultLocale,
    isCurrentLocaleRoute: (route: string, allowSubPath?: boolean) => {
      const localisedRoute = localisedPath(route);
      const asPathJustPath = asPath.replace(/[#|?].*$/, '');

      return allowSubPath
        ? asPathJustPath.startsWith(localisedRoute)
        : localisedRoute === asPathJustPath;
    },
  };
};
