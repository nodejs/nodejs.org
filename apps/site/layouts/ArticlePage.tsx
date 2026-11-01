import Article from '@node-core/ui-components/Containers/Article';

import CarbonTopBar from '#site/components/CarbonAds/TopBar';
import Footer from '#site/components/Footer';
import MetaBar from '#site/components/MetaBar';
import NavBar from '#site/components/NavBar';
import Sidebar from '#site/components/Sidebar';

import type { FC, PropsWithChildren } from 'react';

const ArticlePageLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />

    <Article>
      <Sidebar navKeys={[]} />

      <div>
        <main id="main" tabIndex={-1}>
          <CarbonTopBar />

          {children}
        </main>

        <MetaBar />
      </div>
    </Article>

    <Footer />
  </>
);

export default ArticlePageLayout;
