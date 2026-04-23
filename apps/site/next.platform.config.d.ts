import type { HighlighterOptions } from '@node-core/rehype-shiki';
import type { NextConfig } from 'next';

type PlatformMdxConfig = Pick<HighlighterOptions, 'wasm' | 'twoslash'>;
type PlatformNextConfig = Pick<NextConfig, 'deploymentId' | 'env'>;

/**
 * Shared platform-config contract consumed by `apps/site/next.config.mjs`
 * and implemented by each `@node-core/platform-<target>` package.
 */
export type PlatformConfig = {
  aliases?: Record<string, string>;
  images?: NextConfig['images'];
  mdx?: PlatformMdxConfig;
  nextConfig?: PlatformNextConfig;
};

declare const config: PlatformConfig;

export default config;
