import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithProgressionSidebar from '@/components/withProgressionSidebar';
import WithSidebarCrossLinks from '@/components/withSidebarCrossLinks';
import ArticleLayout from '@/layouts/Article';

import styles from '/components/Containers/Footer/index.module.css';
const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithProgressionSidebar navKey="learn" />

      <div>
        <main>
          {children}

          <WithSidebarCrossLinks navKey="learn" />
        </main>

        <WithMetaBar />
        <div className={styles.mobileFooter}>
          <WithFooter />
        </div>
      </div>

      <WithBreadcrumbs navKeys={['learn']} />
    </ArticleLayout>
    <div className={styles.desktopFooter}>
      <WithFooter />
    </div>
  </>
);

export default LearnLayout;
