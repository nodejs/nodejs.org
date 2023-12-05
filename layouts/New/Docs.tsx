import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSideBar from '@/components/withSideBar';
import ArticleLayout from '@/layouts/New/Article';

// @deprecated: This Layout is Temporary. The `en/docs` route should eventually be removed
// and all "guides" moved to the Learn section.
// A top-level "Docs" Navigation should redirect to the Node.js API docs (Current)
const DocsLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSideBar keys={[]} />

      {children}

      <WithMetaBar />
    </ArticleLayout>

    <WithFooter />
  </>
);

export default DocsLayout;
