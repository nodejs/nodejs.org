import type { FC, PropsWithChildren } from 'react';

import AboutLayout from '#site/layouts/About';
import ArticlePageLayout from '#site/layouts/ArticlePage';
import BlogLayout from '#site/layouts/Blog';
import DefaultLayout from '#site/layouts/Default';
import DownloadLayout from '#site/layouts/Download';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';
import LearnLayout from '#site/layouts/Learn';
import PostLayout from '#site/layouts/Post';
import { ModalProvider } from '#site/providers/modalProvider';
import type { Layouts } from '#site/types';

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

type WithLayoutProps<L = Layouts> = PropsWithChildren<{
  layout: L;
  modal?: string;
}>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({
  layout,
  children,
  modal,
}) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  if (modal) {
    return (
      <ModalProvider type={modal}>
        <LayoutComponent>{children}</LayoutComponent>
      </ModalProvider>
    );
  }

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
