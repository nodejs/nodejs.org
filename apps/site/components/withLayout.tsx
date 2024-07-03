import type { FC, PropsWithChildren } from 'react';

import AboutLayout from '@/layouts/About';
import BlogLayout from '@/layouts/Blog';
import DefaultLayout from '@/layouts/Default';
import DownloadLayout from '@/layouts/Download';
import HomeLayout from '@/layouts/Home';
import LearnLayout from '@/layouts/Learn';
import PostLayout from '@/layouts/Post';
import SearchLayout from '@/layouts/Search';
import type { Layouts } from '@/types';

const layouts = {
  about: AboutLayout,
  home: HomeLayout,
  learn: LearnLayout,
  page: DefaultLayout,
  'blog-post': PostLayout,
  'blog-category': BlogLayout,
  search: SearchLayout,
  download: DownloadLayout,
} satisfies Record<Layouts, FC>;

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
