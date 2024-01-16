import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <div className={styles.centeredLayout}>
      <div className="glowingBackdrop" />

      <main>{children}</main>
    </div>

    <WithFooter />
  </>
);

export default CenteredLayout;
