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

type HProps = React.PropsWithChildren<{
  level: number;
}>;

const H = ({ level, children }: HProps) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return <AnchoredHeading level={level} as={Component}>{children}</AnchoredHeading>;
};

const mdxComponents: MDXComponents = {
  NodeApiVersionLinks,
  h1: (props) => <H level={1} {...props} />,
  h2: (props) => <H level={2} {...props} />,
  h3: (props) => <H level={3} {...props} />,
  h4: (props) => <H level={4} {...props} />,
  h5: (props) => <H level={5} {...props} />,
  h6: (props) => <H level={6} {...props} />,
  blockquote: ({ children }) => <div className="highlight-box">{children}</div>,
};

const Content = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

  useEffect(() => {
    highlightJs.highlightAll();
  }, [asPath]);

  useEffect(() => {
    window.startLegacyApp();
  }, []);

  return (
    <MDXProvider components={mdxComponents} disableParentContext>
      {children}
    </MDXProvider>
  );
};

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
