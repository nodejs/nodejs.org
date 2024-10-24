'use strict';

import { withSentryConfig } from '@sentry/nextjs';
import withNextIntl from 'next-intl/plugin';

import { BASE_PATH, ENABLE_STATIC_EXPORT } from './next.constants.mjs';
import { redirects, rewrites } from './next.rewrites.mjs';
import {
  SENTRY_DSN,
  SENTRY_ENABLE,
  SENTRY_EXTENSIONS,
  SENTRY_TUNNEL,
} from './sentry.constants.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,
  // We intentionally disable Next.js's built-in i18n support
  // as we dom have our own i18n and internationalisation engine
  i18n: null,
  // We want to always enforce that SWC minifies the sources even during Development mode
  // so that bundles are minified on-the-go. SWF minifying is fast, and has almost no penalties
  swcMinify: true,
  // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: BASE_PATH,
  images: {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    // We allow SVGs to be used as images
    dangerouslyAllowSVG: true,
    // We add it to the remote pattern for the static images we use from GitHub
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/nodejs/**',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'website-assets.oramasearch.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // On static export builds we want the output directory to be "build"
  distDir: ENABLE_STATIC_EXPORT ? 'build' : '.next',
  // On static export builds we want to enable the export feature
  output: ENABLE_STATIC_EXPORT ? 'export' : undefined,
  // This configures all the Next.js rewrites, which are used for rewriting internal URLs into other internal Endpoints
  // This feature is not supported within static export builds, hence we pass an empty array if static exports are enabled
  rewrites: !ENABLE_STATIC_EXPORT ? rewrites : undefined,
  // This configures all Next.js redirects
  redirects: !ENABLE_STATIC_EXPORT ? redirects : undefined,
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  // Adds custom WebPack configuration to our Next.hs setup
  webpack: function (config, { webpack }) {
    // Next.js WebPack Bundler does not know how to handle `.mjs` files on `node_modules`
    // This is not an issue when using TurboPack as it uses SWC and it is ESM-only
    // Once Next.js uses Turbopack for their build process we can remove this
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    });

    // Tree-shakes modules from Sentry Bundle
    config.plugins.push(new webpack.DefinePlugin(SENTRY_EXTENSIONS));

    // Ignore Sentry's Critical Dependency from Open Telemetry
    // (which is genuinely a cause of concern, but there is no work around at the moment)
    config.ignoreWarnings = [
      {
        module: /@opentelemetry\/instrumentation/,
        message: /Critical dependency/,
      },
    ];

    return config;
  },
  experimental: {
    // Some of our static pages from `getStaticProps` have a lot of data
    // since we pass the fully-compiled MDX page from `MDXRemote` through
    // a page's static props.
    largePageDataBytes: 128 * 100000,
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      'tailwindcss',
      'shiki',
    ],
    // Removes the warning regarding the WebPack Build Worker
    webpackBuildWorker: true,
    // Enables Next.js's Instrumentation Hook
    instrumentationHook: true,
  },
  // To import ESM-only packages with next dev --turbo. Source: https://github.com/vercel/next.js/issues/63318#issuecomment-2079677098
  transpilePackages: ['shiki', '@orama/react-components'],
};

/** @type {import('@sentry/cli').SentryCliOptions} */
const sentrySettings = {
  // We don't want Sentry to emit logs
  silent: true,
  // Define the Sentry Organisation
  org: 'nodejs-org',
  // Define the Sentry Project on our Sentry Organisation
  project: 'nodejs-org',
  // Sentry DSN for the Node.js Website
  dsn: SENTRY_DSN,
};

/** @type {import('@sentry/nextjs/types/config/types').UserSentryOptions} */
const sentryConfig = {
  // Upload Next.js or third-party code in addition to our code
  widenClientFileUpload: true,
  // Attempt to circumvent ad blockers
  tunnelRoute: SENTRY_TUNNEL(),
  // Prevent source map comments in built files
  hideSourceMaps: false,
  // Tree shake Sentry stuff from the bundle
  disableLogger: true,
  // Applies same WebPack Transpilation as Next.js
  transpileClientSDK: true,
};

// Next.js Configuration with `next.intl` enabled
const nextWithIntl = withNextIntl('./i18n.tsx')(nextConfig);

// Next.js Configuration with `sentry` enabled
const nextWithSentry = withSentryConfig(
  // Next.js Config with i18n Configuration
  nextWithIntl,
  // Sentrz SDK and WebPack Settings
  { ...sentrySettings, ...sentryConfig }
);

// Decides whether enabling Sentry or not
// By default we only want to enable Sentry within a Vercel Environment
export default SENTRY_ENABLE ? nextWithSentry : nextWithIntl;
