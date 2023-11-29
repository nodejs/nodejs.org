import { init } from '@sentry/nextjs';

import { SENTRY_DSN, SENTRY_ENABLE } from '@/next.constants.mjs';

init({ enabled: SENTRY_ENABLE, dsn: SENTRY_DSN });
