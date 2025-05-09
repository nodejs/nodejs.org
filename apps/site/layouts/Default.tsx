import type { FC, PropsWithChildren } from 'react';

import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';
import ArticleLayout from '#site/layouts/Article';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSidebar navKeys={[]} />

      <div>
        <main>{children}</main>
      </div>
    </ArticleLayout>

    <WithFooter />
  </>
);

export default DefaultLayout;
