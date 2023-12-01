import type { FC, PropsWithChildren } from 'react';

import LegacyAboutLayout from '@/layouts/AboutLayout';
import LegacyBlogCategoryLayout from '@/layouts/BlogCategoryLayout';
import LegacyBlogPostLayout from '@/layouts/BlogPostLayout';
import LegacyContributeLayout from '@/layouts/ContributeLayout';
import LegacyDefaultLayout from '@/layouts/DefaultLayout';
import LegacyDocsLayout from '@/layouts/DocsLayout';
import LegacyDownloadLayout from '@/layouts/DownloadLayout';
import LegacyIndexLayout from '@/layouts/IndexLayout';
import LegacyLearnLayout from '@/layouts/LearnLayout';
import AboutLayout from '@/layouts/New/About';
import DefaultLayout from '@/layouts/New/Default';
import DocsLayout from '@/layouts/New/Docs';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';
import type { LegacyLayouts } from '@/types';

/** @deprecated these should be removed with the website redesin */
const legacyLayouts = {
  'docs.hbs': LegacyDocsLayout,
  'about.hbs': LegacyAboutLayout,
  'blog-category.hbs': LegacyBlogCategoryLayout,
  'blog-post.hbs': LegacyBlogPostLayout,
  'contribute.hbs': LegacyContributeLayout,
  'download.hbs': LegacyDownloadLayout,
  'index.hbs': LegacyIndexLayout,
  'learn.hbs': LegacyLearnLayout,
  'page.hbs': LegacyDefaultLayout,
} satisfies Record<string, FC>;

/** all the currently available layouts from website redesign */
const redesignLayouts = {
  'docs.hbs': DocsLayout,
  'about.hbs': AboutLayout,
  'blog-category.hbs': DefaultLayout,
  'blog-post.hbs': DefaultLayout,
  'contribute.hbs': AboutLayout,
  'download.hbs': DefaultLayout,
  'index.hbs': DefaultLayout,
  'learn.hbs': DefaultLayout,
  'page.hbs': DefaultLayout,
} satisfies Record<string, FC>;

/** @deprecated this should be removed once we sunset the legacy layouts */
const availableLayouts = ENABLE_WEBSITE_REDESIGN
  ? redesignLayouts
  : legacyLayouts;

type WithLayoutProps = PropsWithChildren<{ layout: LegacyLayouts }>;

export const WithLayout: FC<WithLayoutProps> = ({ layout, children }) => {
  const LayoutComponent = availableLayouts[layout];

  return <LayoutComponent>{children}</LayoutComponent>;
};
