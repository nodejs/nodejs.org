import styles from './index.module.scss';
import type { FC, PropsWithChildren } from 'react';

const Alert: FC<PropsWithChildren> = props => (
  <div className={styles.alert}>{props.children}</div>
);

export default Alert;
