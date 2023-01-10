import { useRouter } from 'next/router';
import { useMemo } from 'react';

import i18nConfig from '../i18n/config.json';
import { LocaleConfig } from '../types';

const getLocaleConfig = (locale: string) =>
  i18nConfig.find(c => c.code === locale) as LocaleConfig;

export const useLocale = () => {
  const { route } = useRouter();

  const currentLocale = useMemo(
    () => getLocaleConfig(route.split('/')[1]) || getLocaleConfig('en'),
    [route]
  );

  return { currentLocale, availableLocales: i18nConfig };
};
