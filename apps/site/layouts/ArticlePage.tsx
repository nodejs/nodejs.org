import type { FC, PropsWithChildren } from 'react';

import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';
import ArticleLayout from '#site/layouts/Article';

const ArticlePageLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSidebar navKeys={[]} />

      <div>
        <main>{children}</main>

        <WithMetaBar />
      </div>
    </ArticleLayout>
  </>
);

export default ArticlePageLayout;
