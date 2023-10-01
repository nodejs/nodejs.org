import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BreadcrumbItemProps = {
  hideSeparator?: boolean;
};

const BreadcrumbItem: FC<PropsWithChildren<BreadcrumbItemProps>> = ({
  children,
  hideSeparator = false,
}) => (
  <li className={styles.item}>
    {children}
    {!hideSeparator && (
      <ChevronRightIcon aria-hidden="true" className={styles.separator} />
    )}
  </li>
);

export default BreadcrumbItem;
