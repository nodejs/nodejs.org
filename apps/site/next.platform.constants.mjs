'use strict';

/**
 * Identifies the deployment platform the site is being built for.
 *
 * Set by the deployment wrapper at build time: `vercel.json`'s `build.env`
 * sets `vercel`, `open-next.config.ts`'s `buildCommand` sets `cloudflare`.
 * Unset for standalone builds (local dev, static export).
 *
 * The `NEXT_PUBLIC_` prefix makes Next.js inline the value at build time,
 * enabling dead-code elimination of platform-specific branches.
 *
 * @type {'vercel' | 'cloudflare' | 'default'}
 */
export const DEPLOY_TARGET = process.env.NEXT_PUBLIC_DEPLOY_TARGET ?? 'default';

/**
 * The alias for the platform.
 *
 * @type {string}
 */
export const PLATFORM_ALIAS = `@node-core/platform-${DEPLOY_TARGET}`;
