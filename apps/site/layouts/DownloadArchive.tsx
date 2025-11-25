import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const DownloadArchiveLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <div className={styles.downloadLayout}>
      <main>{children}</main>
    </div>

    <WithFooter />
  </>
);

export default DownloadArchiveLayout;
