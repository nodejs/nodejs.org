import { createContext, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

import type { LocaleConfig } from '../types';

type LocaleProviderContext = {
  localeMessages: Record<string, string>;
  availableLocales: LocaleConfig[];
  currentLocale?: LocaleConfig;
};

type LocaleProviderProps = PropsWithChildren<{
  localeMessages: Record<string, string>;
  availableLocales: LocaleConfig[];
  currentLocale: LocaleConfig;
}>;

export const LocaleContext = createContext<LocaleProviderContext>({
  localeMessages: {},
  availableLocales: [],
});

export const LocaleProvider = ({ children, ...props }: LocaleProviderProps) => {
  const { currentLocale, localeMessages } = props;

  const intlProps = { locale: currentLocale.code, messages: localeMessages };

  return (
    <LocaleContext.Provider value={props}>
      <IntlProvider {...intlProps}>{children}</IntlProvider>
    </LocaleContext.Provider>
  );
};
