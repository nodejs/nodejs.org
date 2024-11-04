import { importLocale } from '@node-core/website-i18n';
import { getRequestConfig } from 'next-intl/server';

import { availableLocaleCodes, defaultLocale } from '@/next.locales.mjs';

import deepMerge from './util/deepMerge';

// Loads the Application Locales/Translations Dynamically
const loadLocaleDictionary = async (locale: string) => {
  // This enables HMR on the English Locale, so that instant refresh
  // happens while we add/change texts on the source locale
  const defaultMessages = await import(
    '@node-core/website-i18n/locales/en.json'
  ).then(f => f.default);

  if (locale === defaultLocale.code) {
    return defaultMessages;
  }

  if (availableLocaleCodes.includes(locale)) {
    // Other languages don't really require HMR as they will never be development languages
    // so we can load them dynamically
    const messages = await importLocale(locale);

    // Use default messages as fallback
    return deepMerge(defaultMessages, messages);
  }

  throw new Error(`Unsupported locale: ${locale}`);
};

// Provides `next-intl` configuration for RSC/SSR
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !availableLocaleCodes.includes(locale)) {
    locale = defaultLocale.code;
  }

  return {
    locale,
    // This is the dictionary of messages to be loaded
    messages: await loadLocaleDictionary(locale),
    // We always define the App timezone as UTC
    timeZone: 'Etc/UTC',
  };
});
