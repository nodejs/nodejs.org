import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSideBar from '@/components/withSidebar';
import ArticleLayout from '@/layouts/New/Article';

// @deprecated: This Layout is Temporary. The `en/docs` route should eventually be removed
// and all "guides" moved to the Learn section.
// A top-level "Docs" Navigation should redirect to the Node.js API docs (Current)
const DocsLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSideBar navKeys={[]} />

      <main>{children}</main>

      <WithMetaBar />
    </ArticleLayout>

    <WithFooter />
  </>
);

export default DocsLayout;
