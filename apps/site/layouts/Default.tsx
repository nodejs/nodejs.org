import Article from '@node-core/ui-components/Containers/Article';

import Footer from '#site/components/Footer';
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

    <Footer />
  </>
);

export default DefaultLayout;
