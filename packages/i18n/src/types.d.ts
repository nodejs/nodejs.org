import type EnglishMessages from './locales/en.json';

export type LocaleConfig = {
  code: string;
  localName: string;
  name: string;
  langDir: string;
  dateFormat: string;
  hrefLang: string;
  enabled: boolean;
  default: boolean;
};

export type Locale = typeof EnglishMessages;
