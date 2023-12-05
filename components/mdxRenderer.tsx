import type { MDXComponents, MDXContent } from 'mdx/types';
import type { FC } from 'react';

import { htmlComponents, mdxComponents } from '@/next.mdx.use.mjs';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...mdxComponents,
};

export const MDXRenderer: FC<{ Component: MDXContent }> = ({ Component }) => (
  <Component components={combinedComponents} />
);
