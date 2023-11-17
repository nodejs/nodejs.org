import { init } from '@sentry/nextjs';

import { SENTRY_DSN, SENTRY_ENABLE } from '@/next.constants.mjs';

init({
  // Only run Sentry on Vercel Environment
  enabled: SENTRY_ENABLE,
  // Tell Sentry where to send events
  dsn: SENTRY_DSN,
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: 0.01,
});
