import { IntlProvider } from 'react-intl';
import { PropsWithChildren } from 'react';

import { useLocale } from '../hooks/useLocale';
import type { LocaleData } from '../types';

import defaultLocaleMessages from '../i18n/locales/en.json';

export const LocalProvider = ({
  children,
  localeMessages,
}: PropsWithChildren<{
  localeMessages?: LocaleData['messages'];
}>) => {
  const currentLocaleMessages = Object.assign(
    {},
    localeMessages,
    defaultLocaleMessages
  );
  const { currentLocale } = useLocale();
  const props = { locale: currentLocale.code, messages: currentLocaleMessages };

  return <IntlProvider {...props}>{children}</IntlProvider>;
};
