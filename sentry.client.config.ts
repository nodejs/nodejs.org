import { init, Replay } from '@sentry/nextjs';

import { SENTRY_DSN, VERCEL_ENV } from '@/next.constants.mjs';

init({
  // Only run Sentry on Vercel Environment
  enabled: !!VERCEL_ENV,
  // Tell Sentry where to send events
  dsn: SENTRY_DSN,
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: 0.01,
  // Percentage of sessions to sample (1%)
  replaysSessionSampleRate: 0.01,
  // Percentage of errors to sample (all of them)
  replaysOnErrorSampleRate: 1.0,
  // Support replaying client sessions to capture unhappy paths
  integrations: [new Replay()],
  // We only want to capture errors from _next folder on production
  // We don't want to capture errors from preview branches here
  allowUrls: ['https://nodejs.org/_next'],
  // Filter-out Events/Errors that are invalid for us
  beforeSend: (event, hint) => {
    const originalException = hint.originalException as Error;

    // All the Events we send must have a message and stack trace
    if (originalException?.message && originalException?.stack) {
      // All our Events come eventually from code that originates on node_modules
      // so everything else should be discarded
      // Even React Errors or other errors will eventually have node_modules in the code
      if (String(originalException.stack).includes('node_modules')) {
        return event;
      }
    }

    return null;
  },
});
