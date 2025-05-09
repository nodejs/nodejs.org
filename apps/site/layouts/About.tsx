import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '#site/components/withBreadcrumbs';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';
import ArticleLayout from '#site/layouts/Article';
import { ReleaseModalProvider } from '#site/providers/releaseModalProvider';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <ReleaseModalProvider>
    <WithNavBar />

    <ArticleLayout>
      <WithSidebar navKeys={['about', 'getInvolved']} />

      <div>
        <main>{children}</main>

        <WithMetaBar />
      </div>

      <WithBreadcrumbs navKeys={['about', 'getInvolved']} />
    </ArticleLayout>

    <WithFooter />
  </ReleaseModalProvider>
);

export default AboutLayout;
