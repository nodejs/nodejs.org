import { init } from '@sentry/nextjs';
import { ProfilingIntegration } from '@sentry/profiling-node';

import { SENTRY_DSN } from '@/next.constants.mjs';

init({
  // tell Sentry where to send events
  dsn: SENTRY_DSN,
  // percentage of events to send to Sentry (all of them) (for performance metrics)
  tracesSampleRate: 1,
  // percentage of events to send to Sentry (all of them) (for profiling metrics)
  profilesSampleRate: 1.0,
  // add profiling integration to capture performance metrics
  integrations: [new ProfilingIntegration()],
});
