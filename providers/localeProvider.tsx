import { createContext, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from '@/hooks/useRouter';
import {
  defaultLocale,
  availableLocales,
  getCurrentLocale,
  getCurrentTranslations,
} from '@/next.locales.mjs';
import type { FC, PropsWithChildren } from 'react';
import type { LocaleContext as LocaleContextType } from '@/types';

// Initialises the Context with the default Localisation Data
export const LocaleContext = createContext<LocaleContextType>({
  currentLocale: defaultLocale,
  availableLocales: availableLocales,
  localeMessages: getCurrentTranslations(defaultLocale.code),
  defaultLocale: defaultLocale,
});

export const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { query, asPath } = useRouter();

  const localeData = useMemo(() => {
    // Retrieves the current locale information from the route and query
    const currentLocale = getCurrentLocale(asPath, query);

    return {
      currentLocale: currentLocale,
      availableLocales: availableLocales,
      defaultLocale: defaultLocale,
      localeMessages: getCurrentTranslations(currentLocale.code),
    };
  }, [asPath, query]);

  return (
    <LocaleContext.Provider value={localeData}>
      <IntlProvider
        locale={localeData.currentLocale.hrefLang}
        messages={localeData.localeMessages}
        onError={() => null}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
