import { ChevronDownIcon, ClockIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
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
};

const ChangeHistory: FC<ChangeHistoryProps> = ({
  label = 'History',
  changes = [],
  className,
  'aria-label': ariaLabel = label,
  ...props
}) => {
  if (changes.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('relative', 'inline-block', className)}
      {...props}
    >
      <details className="group">
        <summary className={styles.summary} role="button" aria-haspopup="menu">
          <ClockIcon className="h-4 w-4" />
          <span>{label}</span>
          <ChevronDownIcon className="h-3 w-3 group-open:rotate-180 motion-safe:transition-transform" />
        </summary>
        <div
          className={styles.dropdownContentWrapper}
          role="menu"
          aria-label={ariaLabel}
        >
          <div className="max-h-80 w-52 overflow-y-auto">
            {changes.map((change, index) => {
              const content = (
                <>
                  <div className="block text-sm font-medium leading-tight">
                    {change.label}
                  </div>
                  <div className="block text-xs leading-tight opacity-75">
                    {change.versions.join(', ')}
                  </div>
                </>
              );

              const MenuItem = change.url ? 'a' : 'div';
              return (
                <MenuItem
                  key={index}
                  className={styles.dropdownItem}
                  role={'menuitem'}
                  tabIndex={0}
                  aria-label={`${change.label}:${change.versions.join(', ')}`}
                  href={change.url}
                >
                  {content}
                </MenuItem>
              );
            })}
          </div>
        </div>
      </details>
    </div>
  );
};

export default ChangeHistory;
