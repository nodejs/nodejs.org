import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSidebar from '@/components/withSidebar';
import ArticleLayout from '@/layouts/Article';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
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
  </>
);

export default AboutLayout;
