'use strict';
import createNextIntlPlugin from 'next-intl/plugin';

import { BASE_PATH, ENABLE_STATIC_EXPORT } from './next.constants.mjs';
import { redirects, rewrites } from './next.rewrites.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.1.1.232'],
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: BASE_PATH,
  // Vercel/Next.js Image Optimization Settings
  images: {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    // We add it to the remote pattern for the static images we use from multiple sources
    // to be marked as safe sources (these come from Markdown files)
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/**'),
      new URL('https://bestpractices.coreinfrastructure.org/**'),
      new URL('https://raw.githubusercontent.com/nodejs/**'),
      new URL('https://user-images.githubusercontent.com/**'),
      new URL('https://website-assets.oramasearch.com/**'),
    ],
  },
  serverExternalPackages: ['twoslash'],
  outputFileTracingIncludes: {
    // Twoslash needs TypeScript declarations to function, and, by default, Next.js
    // strips them for brevity. Therefore, they must be explicitly included.
    '/*': [
      '../../node_modules/.pnpm/typescript@*/node_modules/typescript/lib/*.d.ts',
      './node_modules/@types/node/**/*',
    ],
  },
  // On static export builds we want the output directory to be "build"
  distDir: ENABLE_STATIC_EXPORT ? 'build' : undefined,
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
  // Enable statically typed links
  // @see https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links
  typedRoutes: true,
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    useCache: true,
    // Ensure that server-side code is also minified
    serverMinification: true,
    // Use Workers and Threads for webpack compilation
    webpackBuildWorker: true,
    // Execute parallel tracing of server builds
    parallelServerBuildTraces: true,
    // Execute parallel server compilation
    parallelServerCompiles: true,
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: [
      '@radix-ui/react-accessible-icon',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-avatar',
      '@orama/highlight',
      '@orama/react-components',
      'tailwindcss',
      'shiki',
    ],
  },
  // If we're building for the Cloudflare deployment we want to set
  // an appropriate deploymentId (needed for skew protection)
  // TODO: The `OPEN_NEXT_CLOUDFLARE` environment variable is being
  //       defined in the worker building script, ideally the open-next
  //       adapter should set it itself when it invokes the Next.js build
  //       process, onces it does that remove the manual `OPEN_NEXT_CLOUDFLARE`
  //       definition in the package.json script.
  deploymentId: process.env.OPEN_NEXT_CLOUDFLARE
    ? (await import('@opennextjs/cloudflare')).getDeploymentId()
    : undefined,
};

const withNextIntl = createNextIntlPlugin('./i18n.tsx');
export default withNextIntl(nextConfig);
