import classNames from 'classnames';

import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

export type BadgeKind = 'default' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'small' | 'medium';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  size?: BadgeSize;
  kind?: BadgeKind;
};

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  size = 'medium',
  className,
  children,
  ...props
}) => (
  <span
    className={classNames(
      styles.badge,
      styles[kind],
      styles[size],
      {
        [styles.circular]:
          typeof children === 'string' && children.length === 1,
      },
      className
    )}
    {...props}
  >
    {children}
  </span>
);

export default Badge;
