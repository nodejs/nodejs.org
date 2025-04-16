import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  kind?: 'default' | 'warning' | 'error';
};

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={classNames(styles.badge, styles[kind], className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
