import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect } from 'react';
import type { FC } from 'react';

import NodeApiVersionLinks from '@/components/Docs/NodeApiVersionLinks';

const mdxComponents: MDXComponents = {
  NodeApiVersionLinks: NodeApiVersionLinks,
  blockquote: ({ children }) => <div className="highlight-box">{children}</div>,
};

export const MDXProvider: FC<{ content: string }> = ({ content }) => {
  useEffect(() => window.startLegacyApp(), []);

  return (
    <BaseMDXProvider components={mdxComponents} disableParentContext>
      <MDXRemote compiledSource={content} frontmatter={null} scope={null} />
    </BaseMDXProvider>
  );
};
