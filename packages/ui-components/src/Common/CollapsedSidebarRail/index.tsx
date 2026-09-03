'use client';

import classNames from 'classnames';

import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type CollapsedSidebarRailProps = {
  side: 'left' | 'right';
  className?: string;
};

const CollapsedSidebarRail: FC<
  PropsWithChildren<CollapsedSidebarRailProps>
> = ({ side, className, children }) => {
  return (
    <aside className={classNames(styles.rail, styles[side], className)}>
      <div className={styles.container}>{children}</div>
    </aside>
  );
};

export default CollapsedSidebarRail;
