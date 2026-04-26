import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

import type { OpenNextConfig } from '@opennextjs/cloudflare';

const cloudflareConfig = defineCloudflareConfig({
  /**
   * The regional cache implementation with R2 (instead of a KV one) is is chosen here
   * for both R2's strong consistency alongside the regional cache performance gains.
   * @see https://opennext.js.org/cloudflare/caching
   */
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
  }),
  queue: doQueue,
  enableCacheInterception: true,
});

const openNextConfig: OpenNextConfig = {
  ...cloudflareConfig,
  buildCommand: 'pnpm build --webpack',
  cloudflare: {
    skewProtection: { enabled: true },
  },
};

export default openNextConfig;
