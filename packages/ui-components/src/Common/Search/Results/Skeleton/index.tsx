import { SearchResults } from '@orama/ui/components';
import classNames from 'classnames';
import type { FC } from 'react';

import styles from './index.module.css';

const SearchResultsSkeleton: FC = () => (
  <SearchResults.Loading>
    <div className={styles.skeletonWrapper}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.skeletonItem}>
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
