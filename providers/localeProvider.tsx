import { IntlProvider } from 'react-intl';
import { PropsWithChildren, useEffect, useState } from 'react';

import { useLocale } from '../hooks/useLocale';
import type { LocaleData } from '../types';

import defaultLocaleMessages from '../i18n/locales/en.json';

export const LocalProvider = ({ children }: PropsWithChildren) => {
  const [currentLocaleMessages, setCurrentLocaleMessages] = useState<
    LocaleData['messages']
  >(defaultLocaleMessages);

  const { currentLocale } = useLocale();

  useEffect(() => {
    import(`../i18n/locales/${currentLocale.code}.json`).then(
      setCurrentLocaleMessages
    );
  }, [currentLocale.code]);

  const props = { locale: currentLocale.code, messages: currentLocaleMessages };

  return <IntlProvider {...props}>{children}</IntlProvider>;
};
