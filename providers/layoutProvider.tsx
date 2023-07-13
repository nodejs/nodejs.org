import { createContext, useMemo } from 'react';
import AboutLayout from '@/layouts/AboutLayout';
import BlogIndexLayout from '@/layouts/BlogIndexLayout';
import BlogPostLayout from '@/layouts/BlogPostLayout';
import CategoryIndexLayout from '@/layouts/CategoryIndexLayout';
import ContributeLayout from '@/layouts/ContributeLayout';
import DefaultLayout from '@/layouts/DefaultLayout';
import DocsLayout from '@/layouts/DocsLayout';
import DownloadLayout from '@/layouts/DownloadLayout';
import DownloadCurrentLayout from '@/layouts/DownloadCurrentLayout';
import DownloadReleasesLayout from '@/layouts/DownloadReleasesLayout';
import IndexLayout from '@/layouts/IndexLayout';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyFrontMatter, LegacyLayouts } from '@/types';

type LayoutContextProps = {
  frontMatter: LegacyFrontMatter;
};

export const LayoutContext = createContext<LayoutContextProps>({
  frontMatter: {},
});

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

type LayoutProviderProps = PropsWithChildren<LayoutContextProps>;

export const LayoutProvider: FC<LayoutProviderProps> = ({
  children,
  frontMatter,
}) => {
  const LayoutComponent = useMemo(
    () => getLegacyLayout(frontMatter.layout || 'page.hbs'),
    [frontMatter.layout]
  );

  return (
    <LayoutContext.Provider value={{ frontMatter }}>
      <LayoutComponent>{children}</LayoutComponent>
    </LayoutContext.Provider>
  );
};
