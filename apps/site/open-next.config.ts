import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/kv-cache';

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
