import { createContext, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

import type { LocaleContext as LocaleContextType } from '../types';

type LocaleProviderProps = PropsWithChildren<LocaleContextType>;

export const LocaleContext = createContext<LocaleContextType>(undefined as any);

export const LocaleProvider = ({ children, ...props }: LocaleProviderProps) => {
  const { currentLocale, localeMessages } = props;

  const intlProps = { locale: currentLocale.code, messages: localeMessages };

  return (
    <LocaleContext.Provider value={props}>
      <IntlProvider {...intlProps} onError={() => null} fallbackOnEmptyString>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
