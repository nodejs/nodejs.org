import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSideBar from '@/components/withSideBar';
import ArticleLayout from '@/layouts/New/Article';

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
