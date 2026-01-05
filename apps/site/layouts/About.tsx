import Article from '@node-core/ui-components/Containers/Article';

import WithBreadcrumbs from '#site/components/withBreadcrumbs';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
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

        <WithMetaBar />
      </div>

      <WithBreadcrumbs navKeys={['about', 'getInvolved']} />
    </Article>

    <WithFooter />
  </>
);

export default AboutLayout;
