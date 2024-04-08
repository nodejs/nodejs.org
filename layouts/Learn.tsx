import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithMetaBar from '@/components/withMetaBar';
import WithSidebarCrossLinks from '@/components/withSidebarCrossLinks';
import ArticleLayout from '@/layouts/Article';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <ArticleLayout>
      <main>
        <article>{children}</article>

        <WithSidebarCrossLinks navKey="learn" />
      </main>

      <WithMetaBar />

      <WithBreadcrumbs />
    </ArticleLayout>
  </>
);

export default LearnLayout;
