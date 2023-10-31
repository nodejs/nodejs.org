import type { MDXComponents } from 'mdx/types';
import { useEffect, useMemo } from 'react';
import type { FC } from 'react';

import { runMDX } from '@/next.mdx.compiler.mjs';
import { htmlComponents, mdxComponents } from '@/next.mdx.use.mjs';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...mdxComponents,
};

export const MDXProvider: FC<{ content: string }> = ({ content }) => {
  useEffect(() => window.startLegacyApp(), []);

  // Parses the MDX Function and eval's it into a React Component
  const MDXContent = useMemo(() => runMDX(content), [content]);

  return <MDXContent components={combinedComponents} />;
};
