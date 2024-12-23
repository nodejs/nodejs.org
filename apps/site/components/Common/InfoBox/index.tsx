import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type InfoBoxProps = PropsWithChildren<{
  level: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  size?: 'default' | 'small';
}>;

const InfoBox: FC<InfoBoxProps> = ({
  level,
  title,
  children,
  size = 'default',
}) => (
  <div className={classNames(styles.infoBox, styles[level], styles[size])}>
    <span className={styles.title}>{title}</span>
    {children}
  </div>
);

export default InfoBox;
