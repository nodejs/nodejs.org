import React, { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import highlightJs from 'highlight.js/lib/common';
import { useRouter } from 'next/router';
import type { NextraThemeLayoutProps } from 'nextra';
import type { MDXComponents } from 'mdx/types';

import HtmlHead from './components/HtmlHead';
import AnchoredHeading from './components/AnchoredHeading';
import NodeApiVersionLinks from './components/Docs/NodeApiVersionLinks';
import { LayoutProvider } from './providers/layoutProvider';

import type { LegacyFrontMatter } from './types';

type LayoutProps = React.PropsWithChildren<{
  pageOpts: NextraThemeLayoutProps['pageOpts'];
}>;

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

const Content = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

  // Re-highlights the pages on route change
  useEffect(() => highlightJs.highlightAll(), [asPath]);

  useEffect(() => window.startLegacyApp(), []);

  return (
    <MDXProvider components={mdxComponents} disableParentContext>
      {children}
    </MDXProvider>
  );
};

// @TODO: Nextra should provide better customization to FrontMatter Props
interface ThemeProps extends NextraThemeLayoutProps {
  pageOpts: Omit<NextraThemeLayoutProps['pageOpts'], 'frontMatter'> & {
    frontMatter: LegacyFrontMatter;
  };
}

const Theme = ({ children, pageOpts, pageProps }: ThemeProps) => (
  <>
    <HtmlHead frontMatter={pageOpts.frontMatter} />
    <LayoutProvider pageOpts={pageOpts} pageProps={pageProps}>
      <Content pageOpts={pageOpts}>{children}</Content>
    </LayoutProvider>
  </>
);

export default Theme;
