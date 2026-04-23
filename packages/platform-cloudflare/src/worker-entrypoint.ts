// Note: this custom worker-entrypoint is used so that the worker can include sentry support
//       and it has been written by following:
//        - the official open-next docs: https://opennext.js.org/cloudflare/howtos/custom-worker
//        - the official sentry docs: https://docs.sentry.io/platforms/javascript/guides/cloudflare

import { setTags, withSentry } from '@sentry/cloudflare';

import type {
  ExecutionContext,
  Iso3166Alpha2Code,
  Request,
} from '@cloudflare/workers-types';

import { default as handler } from '../../../apps/site/.open-next/worker.js';

export default withSentry(
  (env: {
    /**
     * Sentry DSN, used for error monitoring
     * If missing, Sentry isn't used
     */
    SENTRY_DSN?: string;
  }) => ({
    dsn: env.SENTRY_DSN,
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Set tracesSampleRate to 0.05 to capture 5% of spans for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/cloudflare/configuration/options/#tracesSampleRate
    tracesSampleRate: 0.05,
  }),
  {
    async fetch(
      request: Request,
      env: Record<string, unknown>,
      ctx: ExecutionContext
    ) {
      setTags({
        request_id: crypto.randomUUID(),
        user_agent: request.headers.get('user-agent'),
        ray_id: request.headers.get('cf-ray'),

        // Type casts needed to keep lsp happy
        ip_country: request.cf?.country as Iso3166Alpha2Code | undefined,
        colo: request.cf?.colo as string | undefined,
      });

      return handler.fetch(request, env, ctx);
    },
  }
);

export { DOQueueHandler } from '../../../apps/site/.open-next/worker.js';
