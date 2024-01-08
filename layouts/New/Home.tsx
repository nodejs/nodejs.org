import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <div className={styles.homeLayout}>
      <div />

      <main>{children}</main>
    </div>

    <WithFooter />
  </>
);

export default HomeLayout;
