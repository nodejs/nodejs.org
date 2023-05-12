import { createContext } from 'react';
import { IntlProvider } from 'react-intl';
import i18nConfig from '../i18n/config.json';
import type { FC, PropsWithChildren } from 'react';
import type { AppProps, LocaleContext as LocaleContextType } from '../types';

// Retrieves all the Available Languages
const availableLocales = i18nConfig
  .filter(({ enabled }) => enabled)
  .map(({ code, localName, name }) => ({ code, localName, name }));

type LocaleProviderProps = PropsWithChildren<{
  i18nData: AppProps['i18nData'];
}>;

const fallbackData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

export const LocaleContext = createContext<LocaleContextType>(undefined as any);

export const LocaleProvider: FC<LocaleProviderProps> = ({
  i18nData,
  children,
}) => {
  const { currentLocale, localeMessages } = i18nData || fallbackData;

  return (
    <LocaleContext.Provider value={{ ...i18nData, availableLocales }}>
      <IntlProvider
        locale={currentLocale.code}
        messages={localeMessages}
        onError={() => null}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
