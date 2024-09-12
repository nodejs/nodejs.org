import type { FC, PropsWithChildren } from 'react';

import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSidebar from '@/components/withSidebar';
import ArticleLayout from '@/layouts/Article';

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
