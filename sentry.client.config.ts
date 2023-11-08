import { init, Replay } from '@sentry/nextjs';

import { SENTRY_DSN } from '@/next.constants.mjs';

init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [new Replay({ maskAllText: true, blockAllMedia: true })],
});
