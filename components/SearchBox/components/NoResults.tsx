import type { FC } from 'react';

import styles from './index.module.css';

type NoResultsProps = { searchTerm: string };

export const NoResults: FC<NoResultsProps> = props => (
  <div className={styles.noResultsContainer}>
    No results for&nbsp;
    <span className={styles.noResultsTerm}>{`"${props.searchTerm}"`}</span>.
  </div>
);
