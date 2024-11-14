'use strict';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { availableLocaleCodes } from './next.locales.mjs';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: availableLocaleCodes });
