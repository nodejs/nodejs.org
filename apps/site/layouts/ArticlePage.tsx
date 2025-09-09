import Article from '@node-core/ui-components/Containers/Article';
import type { FC, PropsWithChildren } from 'react';

import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';

const ArticlePageLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <Article>
      <WithSidebar navKeys={[]} />

      <div>
        <main>{children}</main>

        <WithMetaBar />
      </div>
    </Article>

    <WithFooter />
  </>
);

export default ArticlePageLayout;
