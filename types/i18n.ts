export interface LocaleConfig {
  code: string;
  localName: string;
  name: string;
  langDir: string;
  dateFormat: string;
  hrefLang: string;
  enabled: boolean;
}

export interface LocaleContext {
  localeMessages: Record<string, string>;
  availableLocales: LocaleConfig[];
  currentLocale: LocaleConfig;
}
