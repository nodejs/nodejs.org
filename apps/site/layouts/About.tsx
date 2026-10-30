import Article from '@node-core/ui-components/Containers/Article';

import Breadcrumbs from '#site/components/Breadcrumbs';
import Footer from '#site/components/Footer';
import MetaBar from '#site/components/MetaBar';
import NavBar from '#site/components/NavBar';
import WithSidebar from '#site/components/withSidebar';

import type { FC, PropsWithChildren } from 'react';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />

    <Article>
      <WithSidebar navKeys={['about', 'getInvolved']} />

      <div>
        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <MetaBar />
      </div>

      <Breadcrumbs navKeys={['about', 'getInvolved']} />
    </Article>

    <Footer />
  </>
);

export default AboutLayout;
