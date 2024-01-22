import type { FC } from 'react';

import styles from './index.module.css';

export const SearchError: FC = () => (
  <div className={styles.searchErrorContainer}>
    An error occurred while searching. Please try again later.
  </div>
);
