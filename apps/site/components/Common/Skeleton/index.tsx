import type { FC, PropsWithChildren } from 'react';
import { isValidElement } from 'react';

import styles from './index.module.css';

type SkeletonProps = { loading?: boolean };

const Skeleton: FC<PropsWithChildren<SkeletonProps>> = ({
  children,
  loading = true,
}) => {
  if (!loading) {
    return children;
  }

  return (
    <span
      tabIndex={-1}
      aria-hidden="true"
      className={styles.skeleton}
      data-inline-skeleton={isValidElement(children) ? undefined : true}
    >
      {children}
    </span>
  );
};

export default Skeleton;
