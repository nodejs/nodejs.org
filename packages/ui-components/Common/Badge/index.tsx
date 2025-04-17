import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BadgeKind = 'default' | 'warning' | 'error';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  size?: 'small' | 'medium';
  kind?: BadgeKind;
};

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  size = 'medium',
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={classNames(
        styles.badge,
        styles[kind],
        styles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
