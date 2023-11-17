import { SENTRY_DSN, SENTRY_ENABLE } from '@/next.constants.mjs';

// This lazy-loads Sentry on the Browser
import('@sentry/nextjs').then(({ init }) =>
  init({
    // Only run Sentry on Vercel Environment
    enabled: SENTRY_ENABLE,
    // Tell Sentry where to send events
    dsn: SENTRY_DSN,
    // Disable Sentry Tracing as we don't need to have it
    // as Vercel already does Web Vitals and Performance Measurement on Client-Side
    enableTracing: false,
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
  })
);
