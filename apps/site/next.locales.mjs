'use strict';

import {
  getAvailableLocales,
  getAvailableLocaleCodes,
  getDefaultLocale,
  getAvailableLocalesMap,
  getAllLocaleCodes,
} from '@node-core/website-i18n';

// As set of available and enabled locales for the website
// This is used for allowing us to redirect the user to any
// of the available locales that we have enabled on the website
const availableLocales = getAvailableLocales();

// This gives an easy way of accessing all available locale codes
const availableLocaleCodes = getAvailableLocaleCodes();

// This provides the default locale information for the Next.js Application
// This is marked by the unique `locale.default` property on the `en` locale
/** @type {import('@node-core/website-i18n/types').LocaleConfig} */
const defaultLocale = getDefaultLocale();

// Creates a Map of available locales for easy access
const availableLocalesMap = getAvailableLocalesMap();

// Creates all supported locales
const allLocaleCodes = getAllLocaleCodes();

export {
  allLocaleCodes,
  availableLocales,
  availableLocaleCodes,
  availableLocalesMap,
  defaultLocale,
};
