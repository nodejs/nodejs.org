'use strict';

import { availableLocaleCodes } from '@node-core/website-i18n';
import { createNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: availableLocaleCodes,
});
