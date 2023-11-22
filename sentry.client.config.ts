import {
  BrowserClient,
  Dedupe,
  Replay,
  Breadcrumbs,
  HttpContext,
  LinkedErrors,
  BrowserTracing,
  defaultStackParser,
  getCurrentHub,
  makeFetchTransport,
} from '@sentry/nextjs';

import {
  SENTRY_DSN,
  SENTRY_ENABLE,
  SENTRY_CAPTURE_RATE,
} from '@/next.constants.mjs';

// This creates a custom Sentry Client with minimal integrations
export const sentryClient = new BrowserClient({
  // Only run Sentry on Vercel Environment
  enabled: SENTRY_ENABLE,
  // Provide Sentry's Secret Key
  dsn: SENTRY_DSN,
  // Sentry's Error Transport Mechanism
  transport: makeFetchTransport,
  // Sentry's Stack Trace Parser
  stackParser: defaultStackParser,
  // All supported Integrations by us
  integrations: [
    new Replay(),
    new Dedupe(),
    new HttpContext(),
    new Breadcrumbs(),
    new LinkedErrors(),
    new BrowserTracing(),
  ],
  // We only want to capture errors from _next folder on production
  // We don't want to capture errors from preview branches here
  allowUrls: ['https://nodejs.org/', /^https:\/\/.+\.vercel\.app/],
  // Enables Sentry Tracing Feature
  enableTracing: true,
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: SENTRY_CAPTURE_RATE,
  // Percentage of events to send to Sentry (1% of them) (for session replays)
  replaysSessionSampleRate: SENTRY_CAPTURE_RATE,
  // Percentage of events to send to Sentry (1% of them) (for session replays when error happens)
  replaysOnErrorSampleRate: 1.0,
  // Adds custom filtering before sending an Event to Sentry
  beforeSend: (event, hint) => {
    // Attempts to grab the original Exception before any "magic" happens
    const exception = hint.originalException as Error;

    // We only want to capture Errors that have a Stack Trace and that are not Anonymous Errors
    if (exception?.stack && !exception.stack.includes('<anonymous>')) {
      return event;
    }

    return null;
  },
});

// Attaches this Browser Client to Sentry
getCurrentHub().bindClient(sentryClient);
