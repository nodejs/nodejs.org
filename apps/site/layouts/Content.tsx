import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const ContentLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.contentLayout}>{children}</div>
);

export default ContentLayout;
