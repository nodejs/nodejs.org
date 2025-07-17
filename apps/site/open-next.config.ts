import type { OpenNextConfig } from '@opennextjs/cloudflare';
import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import incrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';

const cloudflareConfig = defineCloudflareConfig({ incrementalCache });

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
