import ArticleWithSidebarState from '#site/components/Common/ArticleWithSidebarState';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';

import type { FC, PropsWithChildren } from 'react';

const ArticlePageLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleWithSidebarState>
      <WithSidebar navKeys={[]} />

      <div>
        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <WithMetaBar />
      </div>
    </ArticleWithSidebarState>

    <WithFooter />
  </>
);

export default ArticlePageLayout;
