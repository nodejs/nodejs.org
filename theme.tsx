import React, { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import type { NextraThemeLayoutProps } from 'nextra';
import highlightJs from 'highlight.js/lib/common';

import HtmlHead from './components/HtmlHead';
import type { LegacyFrontMatter } from './types';
import { LayoutProvider } from './providers/layoutProvider';

type LayoutProps = React.PropsWithChildren<{
  pageOpts: NextraThemeLayoutProps['pageOpts'];
}>;

const Content = ({ children }: LayoutProps) => {
  useEffect(() => highlightJs.highlightAll(), []);

  return <MDXProvider disableParentContext>{children}</MDXProvider>;
};

// @TODO: Nextra should provide better customization to FrontMatter Props
interface ThemeProps extends NextraThemeLayoutProps {
  pageOpts: Omit<NextraThemeLayoutProps['pageOpts'], 'frontMatter'> & {
    frontMatter: LegacyFrontMatter;
  };
}

const Theme = ({ children, pageOpts }: ThemeProps) => (
  <>
    <HtmlHead frontMatter={pageOpts.frontMatter} />
    <LayoutProvider layout={pageOpts.frontMatter.layout}>
      <Content pageOpts={pageOpts}>{children}</Content>
    </LayoutProvider>
  </>
);

export default Theme;
