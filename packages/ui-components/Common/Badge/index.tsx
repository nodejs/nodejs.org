import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BadgeKind = 'default' | 'warning' | 'error';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  kind?: BadgeKind;
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
