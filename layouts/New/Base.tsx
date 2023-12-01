import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.baseLayout}>{children}</div>
);

export default BaseLayout;
