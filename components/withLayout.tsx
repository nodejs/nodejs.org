import type { FC, PropsWithChildren } from 'react';

import LegacyAboutLayout from '@/layouts/AboutLayout';
import LegacyBlogCategoryLayout from '@/layouts/BlogCategoryLayout';
import LegacyBlogPostLayout from '@/layouts/BlogPostLayout';
import LegacyDefaultLayout from '@/layouts/DefaultLayout';
import LegacyDocsLayout from '@/layouts/DocsLayout';
import LegacyDownloadLayout from '@/layouts/DownloadLayout';
import LegacyIndexLayout from '@/layouts/IndexLayout';
import LegacyLearnLayout from '@/layouts/LearnLayout';
import AboutLayout from '@/layouts/New/About';
import BlogLayout from '@/layouts/New/Blog';
import DefaultLayout from '@/layouts/New/Default';
import HomeLayout from '@/layouts/New/Home';
import LearnLayout from '@/layouts/New/Learn';
import PostLayout from '@/layouts/New/Post';
import SearchLayout from '@/layouts/New/Search';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';
import type { Layouts, LegacyLayouts } from '@/types';

/** @deprecated these should be removed with the website redesin */
const legacyLayouts = {
  'docs.hbs': LegacyDocsLayout,
  'about.hbs': LegacyAboutLayout,
  'blog-category.hbs': LegacyBlogCategoryLayout,
  'blog-post.hbs': LegacyBlogPostLayout,
  'download.hbs': LegacyDownloadLayout,
  'index.hbs': LegacyIndexLayout,
  'learn.hbs': LegacyLearnLayout,
  'page.hbs': LegacyDefaultLayout,
} satisfies Record<LegacyLayouts, FC>;

/** all the currently available layouts from website redesign */
const redesignLayouts = {
  'about.hbs': AboutLayout,
  'home.hbs': HomeLayout,
  'learn.hbs': LearnLayout,
  'page.hbs': DefaultLayout,
  'blog-post.hbs': PostLayout,
  'blog-category.hbs': BlogLayout,
  'search.hbs': SearchLayout,
} satisfies Record<Layouts, FC>;

type WithLayout<L = Layouts | LegacyLayouts> = PropsWithChildren<{ layout: L }>;

const WithRedesign: FC<WithLayout<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = redesignLayouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

/** @deprecated method to be removed once website redesign is finished */
const WithLegacy: FC<WithLayout<LegacyLayouts>> = ({ layout, children }) => {
  const LayoutComponent = legacyLayouts[layout] ?? LegacyDefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

// Decides which Layout Connector to use based on the Environment
// @todo: This should be removed once we switch to Redesign
export default ENABLE_WEBSITE_REDESIGN ? WithRedesign : WithLegacy;
