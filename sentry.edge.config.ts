import { init } from '@sentry/nextjs';

import {
  SENTRY_CAPTURE_RATE,
  SENTRY_DSN,
  SENTRY_ENABLE,
} from '@/sentry.constants.mjs';

init({
  // Only run Sentry on Vercel Environment
  enabled: SENTRY_ENABLE,
  // Provide Sentry's Secret Key
  dsn: SENTRY_DSN,
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: SENTRY_CAPTURE_RATE,
});
