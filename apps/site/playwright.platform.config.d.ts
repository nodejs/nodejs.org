import type { Config } from '@playwright/test';

/**
 * Shared Playwright platform-config contract consumed by
 * `apps/site/playwright.config.ts` and implemented by each
 * `@node-core/platform-<target>` package.
 */
export type PlatformPlaywrightConfig = {
  baseURL?: string;
  webServer?: Config['webServer'];
};

declare const config: PlatformPlaywrightConfig;

export default config;
