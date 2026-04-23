import type { NextConfig } from 'next';

type PlatformMdxConfig = {
  wasm?: boolean;
  twoslash?: boolean;
};

type PlatformNextConfig = {
  deploymentId?: string;
  env?: NextConfig['env'];
};

export type PlatformConfig = {
  aliases?: Record<string, string>;
  images?: NextConfig['images'];
  mdx?: PlatformMdxConfig;
  nextConfig?: PlatformNextConfig;
};

declare const config: PlatformConfig;

export default config;
