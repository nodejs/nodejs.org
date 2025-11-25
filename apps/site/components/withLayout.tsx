import AboutLayout from '#site/layouts/About';
import ArticlePageLayout from '#site/layouts/ArticlePage';
import BlogLayout from '#site/layouts/Blog';
import DefaultLayout from '#site/layouts/Default';
import DownloadLayout from '#site/layouts/Download';
import DownloadArchiveLayout from '#site/layouts/DownloadArchive';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';
import LearnLayout from '#site/layouts/Learn';
import PostLayout from '#site/layouts/Post';

import type { Layouts } from '#site/types';
import type { FC, PropsWithChildren } from 'react';

const layouts = {
  about: AboutLayout,
  home: GlowingBackdropLayout,
  learn: LearnLayout,
  page: DefaultLayout,
  'blog-post': PostLayout,
  'blog-category': BlogLayout,
  download: DownloadLayout,
  'download-archive': DownloadArchiveLayout,
  article: ArticlePageLayout,
} satisfies Record<Layouts, FC>;

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
