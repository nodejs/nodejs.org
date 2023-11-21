import {
  BrowserClient,
  Dedupe,
  Replay,
  Breadcrumbs,
  HttpContext,
  BrowserTracing,
  defaultStackParser,
  getCurrentHub,
  makeFetchTransport,
} from '@sentry/nextjs';

import { SENTRY_DSN, SENTRY_ENABLE } from '@/next.constants.mjs';

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
    new BrowserTracing(),
  ],
  // We only want to capture errors from _next folder on production
  // We don't want to capture errors from preview branches here
  allowUrls: ['https://nodejs.org/_next'],
  // Enables Sentry Tracing Feature
  enableTracing: true,
});

// Attaches this Browser Client to Sentry
getCurrentHub().bindClient(sentryClient);
