import { init } from '@sentry/nextjs';

import { SENTRY_DSN } from '@/next.constants.mjs';

init({ dsn: SENTRY_DSN, tracesSampleRate: 1, debug: false });
