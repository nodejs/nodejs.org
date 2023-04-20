import type { AppProps } from '../../../types';

export const exampleAbsolutePath =
  'https://github.com/nodejs/nodejs.org/edit/major/website-redesign/pages/en/get-involved/contribute.md';
export const exampleRelativePath = 'get-involved/contribute.md';
export const exampleEditPath = 'pages/en/get-involved/contribute.md';

export const i18nMockDataEnglish = {
  currentLocale: {
    code: 'en',
  },
  localeMessages: {
    'components.article.editLink.title.edit':
      'Edit this page on GitHub (English)',
  },
} as unknown as AppProps['i18nData'];

export const i18nMockDataNonEnglish = {
  currentLocale: {
    code: 'xx',
  },
  localeMessages: {
    'components.article.editLink.title.translate':
      'Interested to help with translations? (Non-English)',
  },
} as unknown as AppProps['i18nData'];
