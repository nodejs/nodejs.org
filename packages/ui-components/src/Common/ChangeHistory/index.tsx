import { ChevronDownIcon, ClockIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import type { LinkLike } from '#ui/types';
import type { FC, ComponentProps } from 'react';

import styles from './index.module.css';

export type HistoryChange = {
  versions: Array<string>;
  label: string;
  url?: string;
};

type ChangeHistoryProps = ComponentProps<'div'> & {
  label: string;
  changes: Array<HistoryChange>;
  as?: LinkLike;
};

const ChangeHistory: FC<ChangeHistoryProps> = ({
  label = 'History',
  changes = [],
  className,
  as: As = 'a',
  'aria-label': ariaLabel = label,
  ...props
}) => (
  <div className={classNames('relative', 'inline-block', className)} {...props}>
    <details className="group">
      <summary className={styles.summary} role="button" aria-haspopup="menu">
        <ClockIcon className="size-4" />
        <span>{label}</span>
        <ChevronDownIcon className="size-3 group-open:rotate-180 motion-safe:transition-transform" />
      </summary>
      <div
        className={styles.dropdownContentWrapper}
        role="menu"
        aria-label={ariaLabel}
      >
        <div className={styles.dropdownContentInner}>
          {changes.map((change, index) => {
            const MenuItem = change.url ? As : 'div';

            return (
              <MenuItem
                key={index}
                className={styles.dropdownItem}
                role="menuitem"
                tabIndex={0}
                aria-label={`${change.label}: ${change.versions.join(', ')}`}
                href={change.url}
              >
                <div className={styles.dropdownLabel}>{change.label}</div>
                <div className={styles.dropdownVersions}>
                  {change.versions.join(', ')}
                </div>
              </MenuItem>
            );
          })}
        </div>
      </div>
    </details>
  </div>
);

export default ChangeHistory;
