import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import ContentLayout from '@/layouts/New/Content';

// @deprecated: This Layout is Temporary. The `en/docs` route should eventually be removed
// and all "guides" moved to the Learn section.
// A top-level "Docs" Navigation should redirect to the Node.js API docs (Current)
const DocsLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ContentLayout>
      <div>
        <main>{children}</main>
      </div>

      <WithMetaBar />
    </ContentLayout>

    <WithFooter />
  </>
);

export default DocsLayout;
