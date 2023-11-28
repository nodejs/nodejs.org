import type { FC, PropsWithChildren } from 'react';

import ArticleLayout from '@/layouts/New/Article';
import WithBreadcrumbs from '@/layouts/New/withBreadcrumbs';
import WithMetaBar from '@/layouts/New/withMetaBar';
import WithNavBar from '@/layouts/New/withNavBar';
import WithSideBar from '@/layouts/New/withSideBar';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSideBar keys={['about', 'getInvolved']} />

      {children}

      <WithMetaBar />

      <WithBreadcrumbs />
    </ArticleLayout>
  </>
);

export default AboutLayout;
