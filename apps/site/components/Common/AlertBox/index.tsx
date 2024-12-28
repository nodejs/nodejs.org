import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type AlertBoxProps = PropsWithChildren<{
  level: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  size?: 'default' | 'small';
}>;

const AlertBox: FC<AlertBoxProps> = ({
  level,
  title,
  children,
  size = 'default',
}) => (
  <div className={classNames(styles.alertBox, styles[level], styles[size])}>
    <span className={styles.title}>{title}</span>
    <span>{children}</span>
  </div>
);

export default AlertBox;
