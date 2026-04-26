import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * Shared Playwright platform-config contract consumed by
 * `apps/site/playwright.config.ts` and implemented by each
 * `@node-core/platform-<target>` package.
 */
export type PlatformPlaywrightConfig = Pick<
  PlaywrightTestConfig,
  'webServer' | 'use'
>;

declare const config: PlatformPlaywrightConfig;

export default config;
