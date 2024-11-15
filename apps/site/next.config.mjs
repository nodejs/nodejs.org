'use strict';

import { withSentryConfig } from '@sentry/nextjs';
import withNextIntl from 'next-intl/plugin';

import { BASE_PATH, ENABLE_STATIC_EXPORT } from './next.constants.mjs';
import { redirects, rewrites } from './next.rewrites.mjs';
import { SENTRY_DSN, SENTRY_TUNNEL } from './sentry.constants.mjs';
import { SENTRY_EXTENSIONS } from './sentry.constants.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,
  // We intentionally disable Next.js's built-in i18n support
  // as we dom have our own i18n and internationalisation engine
  i18n: null,
  // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: BASE_PATH,
  // Vercel/Next.js Image Optimization Settings
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
  rewrites: ENABLE_STATIC_EXPORT ? undefined : rewrites,
  // This configures all Next.js redirects
  redirects: ENABLE_STATIC_EXPORT ? undefined : redirects,
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  // Adds custom WebPack configuration to our Next.js setup
  webpack: ({ plugins, ...config }, { webpack: { DefinePlugin } }) => ({
    ...config,
    plugins: [...plugins, new DefinePlugin(SENTRY_EXTENSIONS)],
  }),
  experimental: {
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: [
      '@radix-ui/react-accessible-icon',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@sentry/nextjs',
      'tailwindcss',
      'shiki',
    ],
  },
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

// Decides whether enabling Sentry or not
// By default we only want to enable Sentry within a Vercel Environment
export default withSentryConfig(
  // Next.js Config with i18n Configuration
  withNextIntl('./i18n.tsx')(nextConfig),
  // Sentrz SDK and WebPack Settings
  { ...sentrySettings, ...sentryConfig }
);
