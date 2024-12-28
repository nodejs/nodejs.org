import type { FC, PropsWithChildren } from 'react';

import AboutLayout from '@/layouts/About';
import ArticlePageLayout from '@/layouts/ArticlePage';
import BlogLayout from '@/layouts/Blog';
import DefaultLayout from '@/layouts/Default';
import DownloadLayout from '@/layouts/Download';
import GlowingBackdropLayout from '@/layouts/GlowingBackdrop';
import LearnLayout from '@/layouts/Learn';
import PostLayout from '@/layouts/Post';
import type { Layouts } from '@/types';

const layouts = {
  about: AboutLayout,
  home: GlowingBackdropLayout,
  learn: LearnLayout,
  page: DefaultLayout,
  'blog-post': PostLayout,
  'blog-category': BlogLayout,
  download: DownloadLayout,
  article: ArticlePageLayout,
} satisfies Record<Layouts, FC>;

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
