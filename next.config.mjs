'use strict';

import * as nextConstants from './next.constants.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: null,
  swcMinify: true,
  trailingSlash: false,
  eslint: { dirs: ['.'] },
  basePath: nextConstants.BASE_PATH,
  images: { unoptimized: nextConstants.ENABLE_STATIC_EXPORT },
  distDir: nextConstants.ENABLE_STATIC_EXPORT ? 'build' : '.next',
  output: nextConstants.ENABLE_STATIC_EXPORT ? 'export' : 'standalone',
  experimental: {
    legacyBrowsers: false,
    nextScriptWorkers: true,
    largePageDataBytes: 128 * 100000,
    swcPlugins: [['next-superjson-plugin', {}]],
    outputFileTracingExcludes: {
      '*': ['public/**', 'pages/**', 'node_modules/**/@swc/core*'],
    },
  },
};

export default nextConfig;
