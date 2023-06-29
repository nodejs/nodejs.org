'use strict';

import * as nextConstants from './next.constants.mjs';
import * as nextData from './next-data/index.mjs';

// generate the node.js releases json file
await nextData.generateNodeReleasesJson();

// generate the data from blog posts
await nextData.generateBlogPostsData();

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: null,
  swcMinify: true,
  trailingSlash: false,
  eslint: { dirs: ['.'] },
  basePath: nextConstants.BASE_PATH,
  images: { unoptimized: nextConstants.ENABLE_STATIC_EXPORT },
  distDir: nextConstants.ENABLE_STATIC_EXPORT ? 'build' : '.next',
  output: nextConstants.ENABLE_STATIC_EXPORT ? 'export' : undefined,
  experimental: {
    nextScriptWorkers: true,
    largePageDataBytes: 128 * 100000,
    swcPlugins: [['next-superjson-plugin', {}]],
  },
};

export default nextConfig;
