import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <main className={styles.homeLayout}>
      <div className={styles.hexagonBackdrop} />

      {children}
    </main>

    <WithFooter />
  </>
);

export default HomeLayout;
