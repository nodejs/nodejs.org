import { init } from '@sentry/nextjs';
import { ProfilingIntegration } from '@sentry/profiling-node';

import { SENTRY_DSN, VERCEL_ENV } from '@/next.constants.mjs';

init({
  // Only run Sentry on Vercel Environment
  enabled: !!VERCEL_ENV,
  // Tell Sentry where to send events
  dsn: SENTRY_DSN,
  // Percentage of events to send to Sentry (all of them) (for performance metrics)
  tracesSampleRate: 1,
  // Percentage of events to send to Sentry (all of them) (for profiling metrics)
  profilesSampleRate: 1.0,
  // Add profiling integration to capture performance metrics
  integrations: [new ProfilingIntegration()],
});
