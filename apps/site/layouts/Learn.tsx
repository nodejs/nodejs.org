import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithProgressionSidebar from '@/components/withProgressionSidebar';
import WithSidebarCrossLinks from '@/components/withSidebarCrossLinks';
import ArticleLayout from '@/layouts/Article';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithProgressionSidebar navKey="learn" />

      <div>
        <main className="md:w-[65vw] lg:w-[48vw]">
          {children}

          <WithSidebarCrossLinks navKey="learn" />
        </main>

        <WithMetaBar />
      </div>

      <WithBreadcrumbs navKeys={['learn']} />
    </ArticleLayout>

    <WithFooter />
  </>
);

export default LearnLayout;
