import type { AppProps, NodeReleaseData } from '../types';
import englishMessages from '../i18n/locales/en.json';

const i18nData: AppProps['i18nData'] = {
  currentLocale: {
    code: 'en',
    localName: 'English',
    name: 'English',
    langDir: 'ltr',
    dateFormat: 'MM.DD.YYYY',
    hrefLang: 'en-US',
    enabled: true,
  },
  localeMessages: englishMessages,
};

export const pageProps = {
  i18nData,
};
