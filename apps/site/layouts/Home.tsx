import type { FC, PropsWithChildren } from 'react';

import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import CenteredLayout from '@/layouts/Centered';

import styles from './layouts.module.css';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <CenteredLayout>
    <GlowingBackdrop />

    <main className={styles.homeLayout}>{children}</main>
  </CenteredLayout>
);

export default HomeLayout;
