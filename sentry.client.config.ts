import {
  Dedupe,
  Breadcrumbs,
  HttpContext,
  LinkedErrors,
  BrowserClient,
  getCurrentHub,
  defaultStackParser,
  makeFetchTransport,
} from '@sentry/nextjs';

import {
  SENTRY_DSN,
  SENTRY_ENABLE,
  SENTRY_CAPTURE_RATE,
  SENTRY_TUNNEL,
} from '@/sentry.constants.mjs';

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
    new Dedupe(),
    new HttpContext(),
    new Breadcrumbs(),
    new LinkedErrors(),
  ],
  // We only want to allow ingestion from these pre-selected allowed URLs
  // Note that the vercel.app prefix is for our Pull Request Branch Previews
  allowUrls: ['https://nodejs.org/', /^https:\/\/.+\.vercel\.app/],
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: SENTRY_CAPTURE_RATE,
  // Percentage of events to send to Sentry (1% of them) (for session replays)
  replaysSessionSampleRate: SENTRY_CAPTURE_RATE,
  // Percentage of events to send to Sentry (1% of them) (for session replays when error happens)
  replaysOnErrorSampleRate: 1.0,
  // Provides a custom Sentry Tunnel Router
  // @note these are components of the Sentry DSN string
  // @see @sentry/nextjs/esm/client/tunnelRoute.js
  tunnel: SENTRY_TUNNEL(`?o=4506191161786368&p=4506191307735040`),
  // Adds custom filtering before sending an Event to Sentry
  beforeSend: (event, hint) => {
    // Attempts to grab the original Exception before any "magic" happens
    const exception = hint.originalException as Error;

    // We only want to capture Errors that have a Stack Trace and that are not Anonymous Errors
    return exception?.stack && !exception.stack.includes('<anonymous>')
      ? event
      : null;
  },
});

// Attaches this Browser Client to Sentry
getCurrentHub().bindClient(sentryClient);

// Loads this Dynamically to avoid adding this to the main bundle (initial load)
import('@sentry/nextjs').then(({ Replay, BrowserTracing }) => {
  sentryClient.addIntegration(new Replay({ maskAllText: false }));
  sentryClient.addIntegration(new BrowserTracing());
});
