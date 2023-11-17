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
  })
);
