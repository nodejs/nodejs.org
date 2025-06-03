import Article from '@node-core/ui-components/Containers/Article';
import type { FC, PropsWithChildren } from 'react';

import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <Article>
      <WithSidebar navKeys={[]} />

      <div>
        <main>{children}</main>
      </div>
    </Article>

    <WithFooter />
  </>
);

export default DefaultLayout;
