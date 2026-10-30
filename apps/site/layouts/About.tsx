import Article from '@node-core/ui-components/Containers/Article';

import Breadcrumbs from '#site/components/Breadcrumbs';
import WithFooter from '#site/components/withFooter';
import MetaBar from '#site/components/MetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';

import type { FC, PropsWithChildren } from 'react';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

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

    <WithFooter />
  </>
);

export default AboutLayout;
