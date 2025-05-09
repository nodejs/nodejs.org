import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '#site/components/withBreadcrumbs';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithProgressionSidebar from '#site/components/withProgressionSidebar';
import WithSidebarCrossLinks from '#site/components/withSidebarCrossLinks';
import ArticleLayout from '#site/layouts/Article';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithProgressionSidebar navKey="learn" />

      <div>
        <main>
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
