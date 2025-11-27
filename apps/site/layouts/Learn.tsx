import Article from '@node-core/ui-components/Containers/Article';

import WithBreadcrumbs from '#site/components/withBreadcrumbs';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithSideBar from '#site/components/withSidebar';
import WithSidebarCrossLinks from '#site/components/withSidebarCrossLinks';

import type { FC, PropsWithChildren } from 'react';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <Article>
      <WithSideBar navKeys={['learn']} />

      <div>
        <main>
          {children}

          <WithSidebarCrossLinks navKey="learn" />
        </main>

        <WithMetaBar />
      </div>

      <WithBreadcrumbs navKeys={['learn']} />
    </Article>

    <WithFooter />
  </>
);

export default LearnLayout;
