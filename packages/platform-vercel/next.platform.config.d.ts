import type { NextConfig } from 'next';

type PlatformMdxConfig = Pick<
  import('@node-core/rehype-shiki').HighlighterOptions,
  'wasm' | 'twoslash'
>;

type PlatformNextConfig = Pick<NextConfig, 'deploymentId' | 'env'>;

export type PlatformConfig = {
  aliases?: Record<string, string>;
  images?: NextConfig['images'];
  mdx?: PlatformMdxConfig;
  nextConfig?: PlatformNextConfig;
};

declare const config: PlatformConfig;

export default config;
