import { ArrowTurnDownLeftIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import type Signature from '#ui/Common/Signature';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SignatureHeaderProps = { isReturn?: boolean } & Omit<
  ComponentProps<typeof Signature>,
  'title' | 'description'
>;

const SignatureHeader: FC<SignatureHeaderProps> = ({
  name,
  type,
  optional,
  isReturn = false,
}) => (
  <div className={styles.header}>
    {name && (
      <span
        className={classNames(styles.attribute, {
          [styles.return]: isReturn,
        })}
      >
        {isReturn && <ArrowTurnDownLeftIcon />}
        <span
          className={classNames({
            [styles.longName]: name.length > 16,
          })}
        >
          {name}:
          {optional && (
            <span
              role="img"
              aria-label="Optional"
              data-tooltip="Optional"
              tabIndex={0}
            >
              ?
            </span>
          )}
        </span>
      </span>
    )}
    {type && <span className={styles.type}>{type}</span>}
  </div>
);

export default SignatureHeader;
