'use strict';

import createNextIntlPlugin from 'next-intl/plugin';

import platform from '#platform/next.platform.config.mjs';

import { BASE_PATH, ENABLE_STATIC_EXPORT } from './next.constants.mjs';
import { getImagesConfig } from './next.image.config.mjs';
import { DEPLOY_TARGET } from './next.platform.constants.mjs';
import { redirects, rewrites } from './next.rewrites.mjs';

const platformImages = await platform.images?.();
const platformNextConfig = await platform.nextConfig?.();

const transpilePackages = DEPLOY_TARGET
  ? [`@node-core/platform-${DEPLOY_TARGET}`]
  : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Full Support of React 18 SSR and Streaming
  reactCompiler: true,
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: BASE_PATH,
  images: getImagesConfig(platformImages),
  serverExternalPackages: ['twoslash'],
  transpilePackages,
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
  // Experimental Flags
  experimental: {
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
      '@radix-ui/react-tooltip',
      '@radix-ui/react-avatar',
      '@orama/highlight',
      '@orama/react-components',
      'tailwindcss',
      'shiki',
    ],
    // Faster Development Servers with Turbopack
    turbopackFileSystemCacheForDev: true,
  },
  // Provide Turbopack Aliases for Platform Resolution
  turbopack: { resolveAlias: platform.aliases },
  // Provide Webpack Aliases for Platform Resolution. The active deployment
  // target is also surfaced to the resolver via `conditionNames` so that
  // `#platform/*` subpath imports in `package.json` pick the matching
  // branch when webpack bundles server code.
  webpack: ({ resolve, ...config }) => ({
    ...config,
    resolve: {
      ...resolve,
      alias: { ...resolve.alias, ...platform.aliases },
      conditionNames: resolve.conditionNames
        .concat(DEPLOY_TARGET)
        .filter(Boolean),
    },
  }),
  ...platformNextConfig,
};

const withNextIntl = createNextIntlPlugin('./i18n.tsx');

export default withNextIntl(nextConfig);
