import styles from './index.module.scss';
import type { FC, PropsWithChildren } from 'react';

const Alert: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.alert}>{children}</div>
);

export default Alert;
