import type { Config } from '@playwright/test';

export type PlatformPlaywrightConfig = {
  baseURL?: string;
  webServer?: Config['webServer'];
};

declare const config: PlatformPlaywrightConfig;

export default config;
