import Article from '@node-core/ui-components/Containers/Article';

import Footer from '#site/components/Footer';
import NavBar from '#site/components/NavBar';
import Sidebar from '#site/components/Sidebar';

import type { FC, PropsWithChildren } from 'react';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />

    <Article>
      <Sidebar navKeys={[]} />

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
