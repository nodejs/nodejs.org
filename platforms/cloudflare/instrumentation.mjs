/**
 * Instrumentation for the Cloudflare deployment: the Worker is instrumented
 * through the Sentry integration in `worker-entrypoint.ts` instead, so the
 * Next.js hook is a no-op here.
 */
export const register = () => {};
