// Imports the global i18n config as a static import
import localeConfig from './i18n/config.json' assert { type: 'json' };

// Import the full Translation manifest for the Application
import translations from './i18n/locales/index.mjs';

// As set of available and enabled locales for the website
// This is used for allowing us to redirect the user to any
// of the available locales that we have enabled on the website
const availableLocales = localeConfig.filter(locale => locale.enabled);

// This provides the default locale information for the Next.js Application
// This is marked by the unique `locale.default` property on the `en` locale
/** @type {import('./types').LocaleConfig} */
const defaultLocale = availableLocales.find(locale => locale.default);

/**
 * Retrieves the Current Locale from the given route or URL Query
 *
 * This will first check the route for the locale code, if it is not found
 * it will then check the URL Query for the locale code, if it is not found
 * it will then return the default locale
 *
 * @param {string} route Current Route String
 * @param {import('querystring').ParsedUrlQuery} query Current Route Query
 * @returns {import('./types').LocaleConfig} Returns the Current Locale
 */
const getCurrentLocale = (route = '/', query = {}) => {
  const localeCode = route.split('/')[1] || query.locale || defaultLocale.code;

  return availableLocales.find(c => c.code === localeCode) || defaultLocale;
};

/**
 * Retrieves the Current Translations for the given locale
 *
 * This will merge the default locale translations with the current locale translations
 * This allows us to only provide the translations that are different from the default locale
 *
 * @param {string} locale The current Locale Code
 * @returns {Record<string, string>} Returns the set of Translations for the given locale
 */
const getCurrentTranslations = locale => ({
  ...translations[defaultLocale.code],
  ...translations[locale],
});

export {
  availableLocales,
  defaultLocale,
  getCurrentLocale,
  getCurrentTranslations,
};
