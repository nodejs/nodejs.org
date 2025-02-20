import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import incrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';

export default defineCloudflareConfig({ incrementalCache });
