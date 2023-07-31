'use strict';

import * as nextConstants from './next.constants.mjs';
import nextRewrites from './next.rewrites.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This configures all the Next.js rewrites
  rewrites: nextRewrites,
  // We intentionally disable Next.js's built-in i18n support
  // as we dom have our own i18n and internationalisation engine
  i18n: null,
  // We want to always enforce that SWC minifies the sources even during Development mode
  // so that bundles are minified on-the-go. SWF minifying is fast, and has almost no penalties
  swcMinify: true,
  // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: nextConstants.BASE_PATH,
  // We disable image optimisation during static export builds
  images: { unoptimized: nextConstants.ENABLE_STATIC_EXPORT },
  // On static export builds we want the output directory to be "build"
  distDir: nextConstants.ENABLE_STATIC_EXPORT ? 'build' : '.next',
  // On static export builds we want to enable the export feature
  output: nextConstants.ENABLE_STATIC_EXPORT ? 'export' : undefined,
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  experimental: {
    // We disable the support for legacy browsers which should reduce the polyiffing
    // and the overall bundle size for the Node.js Website client runtime
    legacyBrowsers: false,
    // Some of our static pages from `getStaticProps` have a lot of data
    // since we pass the fully-compiled MDX page from `MDXRemote` through
    // a page's static props.
    largePageDataBytes: 128 * 100000,
    // We disable the bundling and tracing of some files on the Serverless & Edge Runtimes
    // as otherwise they would explode the bundle size (server) and the tracing time
    outputFileTracingExcludes: {
      '*': ['./public/**', 'node_modules/**/@swc/core*'],
    },
  },
};

export default nextConfig;
