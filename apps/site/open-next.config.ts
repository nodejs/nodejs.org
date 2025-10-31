import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import type { OpenNextConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

const cloudflareConfig = defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
  }),
  queue: doQueue,
  enableCacheInterception: true,
});

const openNextConfig: OpenNextConfig = {
  ...cloudflareConfig,
  buildCommand: 'pnpm build:default',
  cloudflare: {
    skewProtection: {
      enabled: true,
    },
  },
};

export default openNextConfig;
