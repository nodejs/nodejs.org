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

// TODO: Add fixture
// See https://github.com/nodejs/nodejs.org/blob/f0c376bf4404ca2751b24a96681f6ed5edf65b37/__fixtures__/page.tsx
const nodeReleasesData: NodeReleaseData[] = [];

export const pageProps = { i18nData, nodeReleasesData };
