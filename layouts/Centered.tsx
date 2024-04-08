import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';

import styles from './layouts.module.css';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className={styles.centeredLayout}>{children}</div>

    <WithFooter />
  </>
);

export default CenteredLayout;
