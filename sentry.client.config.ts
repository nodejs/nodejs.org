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
  integrations: [new Replay()],
});
