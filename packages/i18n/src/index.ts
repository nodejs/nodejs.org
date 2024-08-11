import localeConfig from './config.json' assert { type: 'json' };

import { LocaleConfig } from './types.js';

export const importLocale = async (locale: string) => {
  const { default: localeData } = await import(`../locales/${locale}.json`);
  return localeData;
};

// As set of available and enabled locales for the website
// This is used for allowing us to redirect the user to any
// of the available locales that we have enabled on the website
export const getAvailableLocales = (): LocaleConfig[] =>
  localeConfig.filter(locale => locale.enabled);

// This gives an easy way of accessing all available locale codes
export const getAvailableLocaleCodes = () =>
  getAvailableLocales().map(locale => locale.code);

// This provides the default locale information for the Next.js Application
// This is marked by the unique `locale.default` property on the `en` locale
export const getDefaultLocale = () =>
  getAvailableLocales().find(locale => locale.default);

// Creates a Map of available locales for easy access
export const getAvailableLocalesMap = () =>
  Object.fromEntries(localeConfig.map(locale => [locale.code, locale]));

// Creates all supported locales
export const getAllLocaleCodes = () => localeConfig.map(locale => locale.code);
