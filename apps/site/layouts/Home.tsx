import type { FC, PropsWithChildren } from 'react';

import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />
    <div className={styles.centeredLayout}>
      <GlowingBackdrop />

      <main className={styles.homeLayout}>{children}</main>
    </div>
    <WithFooter />
  </>
);

export default HomeLayout;
