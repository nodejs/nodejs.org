import { useEffect } from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import HighlightJS from 'highlight.js/lib/core';
import HighlightJavaScript from 'highlight.js/lib/languages/javascript';
import NodeApiVersionLinks from '@/components/Docs/NodeApiVersionLinks';
import type { FC } from 'react';
import type { MDXComponents } from 'mdx/types';

const mdxComponents: MDXComponents = {
  NodeApiVersionLinks: NodeApiVersionLinks,
  blockquote: ({ children }) => <div className="highlight-box">{children}</div>,
};

// This registers the Languages we require/need for Highlight.js
// @TODO: Once we migrate to `nodejs.dev` components, get rid of Highlight.js
HighlightJS.registerLanguage('javascript', HighlightJavaScript);

export const MDXProvider: FC<{ content: string }> = ({ content }) => {
  // Re-highlights the pages on route change
  useEffect(() => HighlightJS.highlightAll(), []);

  useEffect(() => window.startLegacyApp(), []);

  return (
    <BaseMDXProvider components={mdxComponents} disableParentContext>
      <MDXRemote compiledSource={content} frontmatter={null} scope={null} />
    </BaseMDXProvider>
  );
};
