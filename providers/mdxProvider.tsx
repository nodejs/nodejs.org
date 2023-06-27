import { useEffect } from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import highlightJs from 'highlight.js/lib/common';
import AnchoredHeading from '../components/AnchoredHeading';
import NodeApiVersionLinks from '../components/Docs/NodeApiVersionLinks';
import { useRouter } from '../hooks/useRouter';
import type { FC, PropsWithChildren } from 'react';
import type { MDXComponents } from 'mdx/types';

const mdxComponents: MDXComponents = {
  NodeApiVersionLinks: NodeApiVersionLinks,
  h1: props => <AnchoredHeading level={1} {...props} />,
  h2: props => <AnchoredHeading level={2} {...props} />,
  h3: props => <AnchoredHeading level={3} {...props} />,
  h4: props => <AnchoredHeading level={4} {...props} />,
  h5: props => <AnchoredHeading level={5} {...props} />,
  h6: props => <AnchoredHeading level={6} {...props} />,
  blockquote: ({ children }) => <div className="highlight-box">{children}</div>,
};

export const MDXProvider: FC<PropsWithChildren> = ({ children }) => {
  const { asPath } = useRouter();

  // Re-highlights the pages on route change
  useEffect(() => highlightJs.highlightAll(), [asPath]);

  useEffect(() => window.startLegacyApp(), []);

  return (
    <BaseMDXProvider components={mdxComponents} disableParentContext>
      {children}
    </BaseMDXProvider>
  );
};
