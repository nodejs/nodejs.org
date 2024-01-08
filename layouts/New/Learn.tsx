import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithProgressionSidebar from '@/components/withProgressionSidebar';
import WithSidebarCrossLinks from '@/components/withSidebarCrossLinks';
import ArticleLayout from '@/layouts/New/Article';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithProgressionSidebar navKey="learn" />

      <main>
        {children}

        <WithSidebarCrossLinks navKey="learn" />
      </main>

      <WithMetaBar />

      <WithBreadcrumbs />
    </ArticleLayout>
  </>
);

export default LearnLayout;
