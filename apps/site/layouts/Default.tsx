import ArticleWithSidebarState from '#site/components/Common/ArticleWithSidebarState';
import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';

import type { FC, PropsWithChildren } from 'react';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleWithSidebarState>
      <WithSidebar navKeys={[]} />

      <div>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </ArticleWithSidebarState>

    <WithFooter />
  </>
);

export default DefaultLayout;
