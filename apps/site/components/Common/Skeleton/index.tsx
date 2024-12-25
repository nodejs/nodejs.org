import type { FC, PropsWithChildren } from 'react';
import { isValidElement } from 'react';

import styles from './index.module.css';

type SkeletonProps = { hide?: boolean; loading?: boolean };

const Skeleton: FC<PropsWithChildren<SkeletonProps>> = ({
  children,
  hide = false,
  loading = true,
}) => {
  // This can be used to completely hide the children after the Skeleton has loaded
  // If certain criterias do not match. This is useful for conditional rendering without
  // changing the actual tree that the Skeleton is wrapping
  if (!loading && hide) {
    return null;
  }

  // If we finished loading, we can hide the Skeleton and render the children tree
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
