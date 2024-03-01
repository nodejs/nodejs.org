import type { mdxComponents } from '@/next.mdx.use.mjs';

declare global {
  type MDXProvidedComponents = typeof mdxComponents;
}
