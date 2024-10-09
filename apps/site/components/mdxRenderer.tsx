import type { MDXComponents, MDXContent } from 'mdx/types';
import type { FC } from 'react';

import { mdxComponents } from '@/mdx.use';
import { htmlComponents, clientMdxComponents } from '@/mdx.use.client';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...clientMdxComponents,
  ...mdxComponents,
};

export const MDXRenderer: FC<{ Component: MDXContent }> = ({ Component }) => (
  <Component components={combinedComponents} />
);
