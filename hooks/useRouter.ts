import { useRouter as useNextRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import { useMemo } from 'react';

import {
  availableLocales,
  getCurrentLocale,
  defaultLocale,
} from '@/next.locales.mjs';

// Maps all available locales by only their Language Code
const mappedLocalesByCode = availableLocales.map(l => l.code);

export const useRouter = (): NextRouter => {
  const router = useNextRouter();

  return useMemo(() => {
    const currentLocale = getCurrentLocale(router.asPath, router.query);

    return {
      ...router,
      locale: currentLocale.code,
      locales: mappedLocalesByCode,
      defaultLocale: defaultLocale.code,
    };
  }, [router]);
};
