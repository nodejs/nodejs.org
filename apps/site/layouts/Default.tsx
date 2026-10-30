import Article from '@node-core/ui-components/Containers/Article';

import WithFooter from '#site/components/withFooter';
import NavBar from '#site/components/NavBar';
import WithSidebar from '#site/components/withSidebar';

import type { FC, PropsWithChildren } from 'react';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />

    <Article>
      <WithSidebar navKeys={[]} />

      <div>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </Article>

    <WithFooter />
  </>
);

export default DefaultLayout;
