import WithFooter from '#site/components/withFooter';
import NavBar from '#site/components/NavBar';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const DownloadArchiveLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />

    <div className={styles.downloadLayout}>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
    </div>

    <WithFooter />
  </>
);

export default DownloadArchiveLayout;
