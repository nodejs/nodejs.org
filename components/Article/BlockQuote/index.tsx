import styles from './index.module.scss';
import type { FC, PropsWithChildren } from 'react';

const BlockQuote: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.blockQuote}>{children}</div>
);

export default BlockQuote;
