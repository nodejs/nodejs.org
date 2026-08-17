import { SearchResults } from '@orama/ui/components';
import classNames from 'classnames';

import type { FC } from 'react';

import styles from './index.module.css';

const SearchResultsSkeleton: FC = () => (
  <SearchResults.Loading>
    <div className={styles.skeletonWrapper}>
      {['skeleton-1', 'skeleton-2', 'skeleton-3'].map(id => (
        <div key={id} className={styles.skeletonItem}>
          <div
            className={classNames(styles.skeletonAnim, styles.skeletonAvatar)}
          />
          <div className={styles.skeletonText}>
            <div
              className={classNames(
                styles.skeletonAnim,
                styles.skeletonLineShort
              )}
            />
            <div
              className={classNames(
                styles.skeletonAnim,
                styles.skeletonLineLong
              )}
            />
          </div>
        </div>
      ))}
    </div>
  </SearchResults.Loading>
);

export default SearchResultsSkeleton;
