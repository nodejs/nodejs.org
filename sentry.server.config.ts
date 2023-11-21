import { init } from '@sentry/nextjs';
import { ProfilingIntegration } from '@sentry/profiling-node';

import { SENTRY_DSN, SENTRY_ENABLE } from '@/next.constants.mjs';

init({
  // Only run Sentry on Vercel Environment
  enabled: SENTRY_ENABLE,
  // Provide Sentry's Secret Key
  dsn: SENTRY_DSN,
  // Enables Sentry Tracing Feature
  enableTracing: true,
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: 0.01,
  // Percentage of events to send to Sentry (all of them) (for profiling metrics)
  // This number is relative to tracesSampleRate - so all traces get profiled
  profilesSampleRate: 1.0,
  // Add profiling integration to capture performance metrics
  integrations: [new ProfilingIntegration()],
});
