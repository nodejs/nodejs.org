import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { linkWithLocale } from '../util/linkWithLocale';
import type { LocaleConfig } from '../types';

import i18nConfig from '../i18n/config.json';

const getLocaleConfig = (locale: string) =>
  i18nConfig.find(c => c.code === locale) as LocaleConfig;

export const useLocale = () => {
  const { route, asPath } = useRouter();

  const currentLocale = useMemo(
    () => getLocaleConfig(route.split('/')[1]) || getLocaleConfig('en'),
    [route]
  );

  const localisedLink = linkWithLocale(currentLocale.code);

  return {
    currentLocale,
    availableLocales: i18nConfig,
    isCurrentLocaleRoute: (route: string) => localisedLink(route) === asPath,
  };
};
