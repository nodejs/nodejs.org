import { createContext } from 'react';
import type { PropsWithChildren } from 'react';
import type { PageOpts } from 'nextra';

import AboutLayout from '../layouts/AboutLayout';
import BlogIndexLayout from '../layouts/BlogIndexLayout';
import BlogPostLayout from '../layouts/BlogPostLayout';
import CategoryIndexLayout from '../layouts/CategoryIndexLayout';
import ContributeLayout from '../layouts/ContributeLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import DocsLayout from '../layouts/DocsLayout';
import DownloadLayout from '../layouts/DownloadLayout';
import DownloadCurrentLayout from '../layouts/DownloadCurrentLayout';
import DownloadReleasesLayout from '../layouts/DownloadReleasesLayout';
import IndexLayout from '../layouts/IndexLayout';

import type { LegacyLayouts, NextraAppProps } from '../types';

type LayoutProviderProps = PropsWithChildren<{
  pageOpts: PageOpts;
  pageProps: NextraAppProps['pageProps'];
}>;

export const LayoutContext = createContext<{
  layout: LegacyLayouts;
  pageOpts: PageOpts;
  pageProps: NextraAppProps['pageProps'];
}>(undefined as any);

const getLegacyLayout = (layout: LegacyLayouts) => {
  switch (layout) {
    case 'about.hbs':
      return AboutLayout;
    case 'blog-index.hbs':
      return BlogIndexLayout;
    case 'blog-post.hbs':
      return BlogPostLayout;
    case 'category-index.hbs':
      return CategoryIndexLayout;
    case 'contribute.hbs':
      return ContributeLayout;
    case 'docs.hbs':
      return DocsLayout;
    case 'download.hbs':
      return DownloadLayout;
    case 'download-current.hbs':
      return DownloadCurrentLayout;
    case 'download-releases.hbs':
      return DownloadReleasesLayout;
    case 'index.hbs':
      return IndexLayout;
    default:
      return DefaultLayout;
  }
};

export const LayoutProvider = ({ children, ...props }: LayoutProviderProps) => {
  const layout = props.pageOpts.frontMatter.layout;

  const LayoutComponent = getLegacyLayout(layout);

  return (
    <LayoutContext.Provider value={{ layout, ...props }}>
      <LayoutComponent>{children}</LayoutComponent>
    </LayoutContext.Provider>
  );
};
