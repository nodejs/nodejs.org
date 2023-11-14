import { init, Replay } from '@sentry/nextjs';

import { SENTRY_DSN } from '@/next.constants.mjs';

init({
  // tell Sentry where to send events
  dsn: SENTRY_DSN,
  // percentage of events to send to Sentry (all of them)
  tracesSampleRate: 1,
  // percentage of errors to sample (all of them)
  replaysOnErrorSampleRate: 1.0,
  // percentage of sessionsto sample (10%)
  replaysSessionSampleRate: 0.1,
  // support replaying client sessions to capture unhappy paths
  integrations: [new Replay()],
  // we only want to capture errors from _next folder on production
  // we don't want to capture errors from preview branches here
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
