import createMiddleware from 'next-intl/middleware';

import { availableLocaleCodes, defaultLocale } from '@/next.locales.mjs';

export default createMiddleware({
  // A list of all locales that are supported
  locales: availableLocaleCodes,

  // Used when no locale matches
  defaultLocale: defaultLocale.code,
});

export const config = {
  // Note.: This needs to be updated when activating more locales
  // Format: '/(locale1|locale2|locale3|...)/:path*'
  matcher: ['/', '/(en)/:path*'],
};
