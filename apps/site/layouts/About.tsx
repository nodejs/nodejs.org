import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSidebar from '@/components/withSidebar';
import ArticleLayout from '@/layouts/Article';
import { ReleaseModalProvider } from '@/providers/releaseModalProvider';

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
