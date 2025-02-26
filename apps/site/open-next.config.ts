import cache from '@opennextjs/cloudflare/kv-cache';

const config = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      incrementalCache: async () => cache,
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },

  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
    },
  },

  dangerous: {
    enableCacheInterception: false,
  },
};

export default config;
