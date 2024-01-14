import { BASE_URL, IS_DEVELOPMENT, VERCEL_ENV } from './next.constants.mjs';

/**
 * This is the Sentry DSN for the Node.js Website Project
 */
export const SENTRY_DSN =
  'https://02884d0745aecaadf5f780278fe5fe70@o4506191161786368.ingest.sentry.io/4506191307735040';

/**
 * This states if Sentry should be enabled and bundled within our App
 *
 * We enable sentry by default if we're om development mode or deployed
 * on Vercel (either production or preview branches)
 */
export const SENTRY_ENABLE = IS_DEVELOPMENT || !!VERCEL_ENV;

/**
 * This configures the sampling rate for Sentry
 *
 * We always want to capture 100% on Vercel Preview Branches
 * and not when it's on Production Mode (nodejs.org)
 */
export const SENTRY_CAPTURE_RATE =
  SENTRY_ENABLE && VERCEL_ENV && BASE_URL !== 'https://nodejs.org' ? 1.0 : 0.01;

/**
 * Provides the Route for Sentry's Server-Side Tunnel
 *
 * This is a `@sentry/nextjs` specific feature
 */
export const SENTRY_TUNNEL = (components = '') =>
  SENTRY_ENABLE ? `/monitoring${components}` : undefined;

/**
 * This configures which Sentry features to tree-shake/remove from the Sentry bundle
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
 */
export const SENTRY_EXTENSIONS = {
  __SENTRY_DEBUG__: false,
  __SENTRY_TRACING__: false,
  __RRWEB_EXCLUDE_IFRAME__: true,
  __RRWEB_EXCLUDE_SHADOW_DOM__: true,
  __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
};
