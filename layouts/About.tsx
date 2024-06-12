import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSidebar from '@/components/withSidebar';
import ArticleLayout from '@/layouts/Article';

import styles from '/components/Containers/Footer/index.module.css';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSidebar navKeys={['about', 'getInvolved']} />

      <div>
        <main>{children}</main>

        <WithMetaBar />
        <div className={styles.mobileFooter}>
          <WithFooter />
        </div>
      </div>

      <WithBreadcrumbs navKeys={['about', 'getInvolved']} />
    </ArticleLayout>
    <div className={styles.desktopFooter}>
      <WithFooter />
    </div>
  </>
);

export default AboutLayout;
