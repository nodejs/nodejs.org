import createMiddleware from 'next-intl/middleware';

import { availableLocaleCodes, defaultLocale } from '#site/next.locales.mjs';

export const proxy = createMiddleware({
  // A list of all locales that are supported
  locales: availableLocaleCodes,

  // Used when no locale matches
  defaultLocale: defaultLocale.code,

  // Always use a Locale as a prefix for routing
  localePrefix: 'always',

  // We already have our own way of providing alternate links
  // generated on `next.dynamic.mjs`
  alternateLinks: false,
});

export default proxy;
// We only want the proxy to run on the `/` route
// to redirect users to their preferred locale
export const config = { matcher: ['/'] };
