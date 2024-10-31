'use strict';

import { createNavigation } from 'next-intl/navigation';

import { availableLocaleCodes } from './next.locales.mjs';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: availableLocaleCodes,
});
