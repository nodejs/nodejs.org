import type { FC, PropsWithChildren } from 'react';

import CenteredLayout from '@/layouts/New/Centered';

import styles from './layouts.module.css';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <CenteredLayout>
    <div className="glowingBackdrop" />

    <main className={styles.homeLayout}>{children}</main>
  </CenteredLayout>
);

export default HomeLayout;
