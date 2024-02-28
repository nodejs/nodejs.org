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
  'about.hbs': AboutLayout,
  'home.hbs': HomeLayout,
  'learn.hbs': LearnLayout,
  'page.hbs': DefaultLayout,
  'blog-post.hbs': PostLayout,
  'blog-category.hbs': BlogLayout,
  'search.hbs': SearchLayout,
  'download.hbs': DownloadLayout,
} satisfies Record<Layouts, FC>;

type WithLayouProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayouProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
