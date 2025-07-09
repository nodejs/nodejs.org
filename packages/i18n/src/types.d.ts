import type EnglishMessages from './locales/en.json';

export interface LocaleConfig {
  code: string;
  localName: string;
  name: string;
  langDir: string;
  dateFormat: string;
  hrefLang: string;
  enabled: boolean;
  default: boolean;
}

export type Locale = typeof EnglishMessages;
