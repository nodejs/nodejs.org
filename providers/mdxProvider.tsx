import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect } from 'react';
import type { FC } from 'react';

import { htmlComponents, mdxComponents } from '@/next.mdx.use.mjs';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...mdxComponents,
};

export const MDXProvider: FC<{ content: string }> = ({ content }) => {
  useEffect(() => window.startLegacyApp(), []);

  return (
    <BaseMDXProvider components={combinedComponents} disableParentContext>
      <MDXRemote compiledSource={content} frontmatter={null} scope={null} />
    </BaseMDXProvider>
  );
};
