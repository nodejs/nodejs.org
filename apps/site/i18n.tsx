import { importLocale } from '@node-core/website-i18n';
import defaultMessages from '@node-core/website-i18n/locales/en.json';
import { getRequestConfig } from 'next-intl/server';

import { availableLocaleCodes, defaultLocale } from '#site/next.locales.mjs';

import { deepMerge } from './util/objects';

// Loads the Application Locales/Translations Dynamically
const loadLocaleDictionary = async (locale: string) => {
  if (locale === defaultLocale.code) {
    return defaultMessages;
  }

  if (availableLocaleCodes.includes(locale)) {
    // Other languages don't really require HMR as they
    // will never be development languages so we can load them dynamically
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
