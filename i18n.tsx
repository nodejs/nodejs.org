import { getRequestConfig } from 'next-intl/server';

import { availableLocaleCodes } from '@/next.locales.mjs';

// Loads the Application Locales/Translations Dynamically
const loadLocaleDictionary = async (locale: string) => {
  if (locale === 'en') {
    // This enables HMR on the English Locale, so that instant refresh
    // happens while we add/change texts on the source locale
    return import('./i18n/locales/en.json').then(f => f.default);
  }

  if (locale in availableLocaleCodes) {
    // Other languages don't really require HMR as they will never be development languages
    // so we can load them dynamically
    return import(`./i18n/locales/${locale}.json`).then(f => f.default);
  }

  throw new Error(`Unsupported locale: ${locale}`);
};

// Provides `next-intl` configuration for RSC/SSR
export default getRequestConfig(async ({ locale }) => ({
  // This is the dictionary of messages to be loaded
  messages: await loadLocaleDictionary(locale),
  // We always define the App timezone as UTC
  timeZone: 'Etc/UTC',
}));
