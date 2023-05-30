import { useMemo } from 'react';
import { useRouter as useNextRouter } from 'next/router';
import * as nextLocales from '../next.locales.mjs';
import type { NextRouter } from 'next/router';

// Maps all available locales by only their Language Code
const mappedLocalesByCode = nextLocales.availableLocales.map(l => l.code);

export const useRouter = (): NextRouter => {
  const router = useNextRouter();

  return useMemo(() => {
    const currentLocale = nextLocales.getCurrentLocale(
      router.asPath,
      router.query
    );

    return {
      ...router,
      locale: currentLocale.code,
      locales: mappedLocalesByCode,
      defaultLocale: nextLocales.defaultLocale.code,
    };
  }, [router]);
};
