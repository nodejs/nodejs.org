import { createContext, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

import type { AppProps, LocaleContext as LocaleContextType } from '../types';

// TODO: We already import on the `getStaticProps` side, but some routes do not get the `getStaticProps` hence we need to fallback data here
// might be a good opportunity to once we change to the code from `nodejs/nodejs.dev` to have an unified place for i18n stuff.
import i18nConfig from '../i18n/config.json';

type LocaleProviderProps = PropsWithChildren<{
  i18nData: AppProps['i18nData'];
}>;

// this is used just as fallback data to prevent issues with react-intl
const fallbackData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

export const LocaleContext = createContext<LocaleContextType>(undefined as any);

export const LocaleProvider = ({ children, i18nData }: LocaleProviderProps) => {
  const { currentLocale, localeMessages } = i18nData || fallbackData;

  const intlProps = { locale: currentLocale.code, messages: localeMessages };

  const availableLocales = i18nConfig.map(({ code, localName, name }) => ({
    code,
    localName,
    name,
  }));

  return (
    <LocaleContext.Provider value={{ ...i18nData, availableLocales }}>
      <IntlProvider {...intlProps} onError={() => null}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
