import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import type { NextraThemeLayoutProps } from 'nextra';

import Header from './components/Header';
import type { LegacyFrontMatter } from './types';
import { LayoutProvider } from './providers/layoutProvider';

type LayoutProps = React.PropsWithChildren<{
  pageOpts: NextraThemeLayoutProps['pageOpts'];
}>;

const Content = ({ children }: LayoutProps) => (
  <main id="main">
    {/* implement the different kind of layouts */}
    <article>
      <MDXProvider>{children}</MDXProvider>
    </article>
  </main>
);

// @TODO: Nextra should provide better customization to FrontMatter Props
interface ThemeProps extends NextraThemeLayoutProps {
  pageOpts: Omit<NextraThemeLayoutProps['pageOpts'], 'frontMatter'> & {
    frontMatter: LegacyFrontMatter;
  };
}

const Theme = ({ children, pageOpts }: ThemeProps) => (
  <>
    <Header frontMatter={pageOpts.frontMatter} />
    <LayoutProvider layout={pageOpts.frontMatter.layout}>
      <Content pageOpts={pageOpts}>{children}</Content>
    </LayoutProvider>
  </>
);

export default Theme;
