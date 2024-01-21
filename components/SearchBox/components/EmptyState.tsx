import type { FC } from 'react';

import styles from './index.module.css';

export const EmptyState: FC = () => (
  <div className={styles.emptyStateContainer}>Search something...</div>
);
