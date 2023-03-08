export interface LocaleConfig {
  code: string;
  localName: string;
  name: string;
  langDir: 'rtl' | 'ltr';
  dateFormat: string;
  hrefLang: string;
  enabled: boolean;
}

export interface LocaleContext {
  localeMessages: Record<string, string>;
  availableLocales: Pick<LocaleConfig, 'code' | 'localName' | 'name'>[];
  currentLocale: LocaleConfig;
}
