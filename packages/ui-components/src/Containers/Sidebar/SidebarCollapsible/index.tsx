import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type SidebarCollapsibleProps = {
  summary: ReactNode;
  open?: boolean;
  className?: string;
};

// Callers style the summary and its chevron through `> summary` and `> summary svg`
const SidebarCollapsible: FC<PropsWithChildren<SidebarCollapsibleProps>> = ({
  summary,
  open,
  className,
  children,
}) => (
  <details className={classNames(styles.collapsible, className)} open={open}>
    <summary className={styles.summary}>
      <span>{summary}</span>
      <ChevronDownIcon className={styles.chevron} />
    </summary>

    {children}
  </details>
);

export default SidebarCollapsible;
