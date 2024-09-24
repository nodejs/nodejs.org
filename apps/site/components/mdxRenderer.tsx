import type { MDXComponents, MDXContent } from 'mdx/types';
import type { FC } from 'react';

import { htmlComponents, clientMdxComponents } from '@/next.mdx.use.client.mjs';
import { mdxComponents } from '@/next.mdx.use.mjs';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...clientMdxComponents,
  ...mdxComponents,
};

export const MDXRenderer: FC<{ Component: MDXContent }> = ({ Component }) => (
  <Component components={combinedComponents} />
);
