import { ChevronDownIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

import styles from './index.module.css';

type ChangeHistoryProps = React.JSX.IntrinsicElements['div'] & {
  label: string;
  changes: Array<{
    versions: Array<string>;
    label: string;
    url?: string;
  }>;
  align?: 'left' | 'right';
};

const ChangeHistory: FC<ChangeHistoryProps> = ({
  label = 'History',
  changes = [],
  align = 'right',
  className = '',
  'aria-label': ariaLabel = label,
  ...props
}) => (
  <div className={`${styles.changeHistory} ${className}`} {...props}>
    {changes.length > 0 ? (
      <details className="group">
        <summary className={styles.summary} role="button" aria-haspopup="menu">
          <ClockIcon className={styles.icon} />
          <span>{label}</span>
          <ChevronDownIcon className={styles.chevron} />
        </summary>
        <div
          className={`${styles.dropdownContent} ${
            align === 'left' ? styles.alignLeft : styles.alignRight
          }`}
          role="menu"
          aria-label={ariaLabel}
        >
          <div className={styles.dropdownContentInner}>
            {changes.map(change => {
              const content = (
                <>
                  <div className={styles.dropdownLabel}>{change.label}</div>
                  <div className={styles.dropdownVersions}>
                    {change.versions.join(', ')}
                  </div>
                </>
              );

              const ariaLabel = `${change.label}: ${change.versions.join(', ')}`;

              const itemProps = {
                key: ariaLabel,
                className: styles.dropdownItem,
                role: 'menuitem',
                tabIndex: 0,
                ['aria-label']: ariaLabel,
              };

              return change.url ? (
                <a {...itemProps} href={change.url}>
                  {content}
                </a>
              ) : (
                <div {...itemProps}>{content}</div>
              );
            })}
          </div>
        </div>
      </details>
    ) : (
      <div
        className={`${styles.summary} ${styles.disabled}`}
        role="button"
        aria-disabled="true"
      >
        <ClockIcon className={styles.icon} aria-hidden="true" />
        <span>{label}</span>
        <ChevronDownIcon className={styles.chevron} aria-hidden="true" />
      </div>
    )}
  </div>
);

export default ChangeHistory;
