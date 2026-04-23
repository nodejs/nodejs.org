import type { HighlighterOptions } from '@node-core/rehype-shiki';
import type { NextConfig } from 'next';

type PlatformMdxConfig = Pick<HighlighterOptions, 'wasm' | 'twoslash'>;
type PlatformNextConfig = Pick<NextConfig, 'deploymentId' | 'env'>;

/**
 * Shared platform-config contract consumed by `apps/site/next.config.mjs`
 * and implemented by each `@node-core/platform-<target>` package.
 *
 * `nextConfig` and `images` are async thunks so that platform modules
 * that depend on Node-only tooling (e.g. `@opennextjs/cloudflare`,
 * `require.resolve`) can keep those imports out of the module's
 * top-level. Webpack bundles the top level of this module into the
 * server output; deferring heavy work into function bodies keeps the
 * worker runtime free of build-only code.
 */
export type PlatformConfig = {
  aliases?: Record<string, string>;
  images?: () => Promise<NextConfig['images']>;
  mdx?: PlatformMdxConfig;
  nextConfig?: () => Promise<PlatformNextConfig>;
};

declare const config: PlatformConfig;

export default config;
