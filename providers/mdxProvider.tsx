import type { MDXComponents } from 'mdx/types';
import { useMemo } from 'react';
import type { FC } from 'react';

import { runMDX } from '@/next.mdx.compiler.mjs';
import { htmlComponents, mdxComponents } from '@/next.mdx.use.mjs';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...mdxComponents,
};

export const MDXProvider: FC<{ content: string }> = ({ content }) => {
  // Parses the MDX Function and eval's it into a React Component
  // We don't need asynchronous runtime here as we want to render the MDX
  // as soon as it is available and be able to make initial renders
  const MDXContent = useMemo(() => runMDX(content), [content]);

  return <MDXContent components={combinedComponents} />;
};
