import type { clientMdxComponents } from '@/next.mdx.use.client.mjs';
import type { mdxComponents } from '@/next.mdx.use.mjs';

declare global {
  type MDXProvidedComponents = typeof mdxComponents &
    typeof clientMdxComponents;
}
