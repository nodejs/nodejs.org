import { useMemo, type FC, type PropsWithChildren } from 'react';

import AboutLayout from '@/layouts/AboutLayout';
import BlogCategoryLayout from '@/layouts/BlogCategoryLayout';
import BlogPostLayout from '@/layouts/BlogPostLayout';
import ContributeLayout from '@/layouts/ContributeLayout';
import DefaultLayout from '@/layouts/DefaultLayout';
import DocsLayout from '@/layouts/DocsLayout';
import DownloadLayout from '@/layouts/DownloadLayout';
import IndexLayout from '@/layouts/IndexLayout';
import LearnLayout from '@/layouts/LearnLayout';
import type { LegacyLayouts } from '@/types';

const layoutComponents = {
  'docs.hbs': DocsLayout,
  'about.hbs': AboutLayout,
  'blog-categpry.hbs': BlogCategoryLayout,
  'blog-post.hbs': BlogPostLayout,
  'contribute.hbs': ContributeLayout,
  'download.hbs': DownloadLayout,
  'index.hbs': IndexLayout,
  'learn.hbs': LearnLayout,
  'page.hbs': DefaultLayout,
} satisfies Record<string, FC>;

type WithLayoutProps = PropsWithChildren<{ layout: LegacyLayouts }>;

export const WithLayout: FC<WithLayoutProps> = ({ layout, children }) => {
  const LayoutComponent = useMemo(
    () => layoutComponents[layout] || DefaultLayout,
    [layout]
  );

  return <LayoutComponent>{children}</LayoutComponent>;
};
