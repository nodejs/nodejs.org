// Note: this custom worker-entrypoint is used so that the worker can include sentry support
//       and it has been written by following:
//        - the official open-next docs: https://opennext.js.org/cloudflare/howtos/custom-worker
//        - the official sentry docs: https://docs.sentry.io/platforms/javascript/guides/cloudflare

import { withSentry } from '@sentry/cloudflare';

import type { ExecutionContext } from '@cloudflare/workers-types';

import { default as handler } from '../.open-next/worker.js';

export default withSentry(
  () => ({
    dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/cloudflare/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/cloudflare/configuration/options/#tracesSampleRate
    tracesSampleRate: 1.0,
  }),
  {
    async fetch(
      request: Request,
      env: Record<string, unknown>,
      ctx: ExecutionContext
    ) {
      return handler.fetch(request, env, ctx);
    },
  }
);

export { DOQueueHandler } from '../.open-next/worker.js';
