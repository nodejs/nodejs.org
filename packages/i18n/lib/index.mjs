'use strict';

import localeConfig from '@node-core/website-i18n/config.json' with { type: 'json' };

/**
 * Imports a locale when exists from the locales directory
 *
 * @param {string} locale The locale code to import
 * @returns {Record<string, any>} The imported locale
 */
export const importLocale = async locale => {
  return import(`../locales/${locale}.json`).then(f => f.default);
};

/**
 * A set of available and enabled locales for the website
 * This is used for allowing us to redirect the user to any
 * of the available locales that we have enabled on the website
 *
 * @returns {Array<import('../types').LocaleConfig>}
 */
export const getAvailableLocales = () =>
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
