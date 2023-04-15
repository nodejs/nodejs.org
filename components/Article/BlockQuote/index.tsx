import type { PropsWithChildren } from 'react';
import styles from './index.module.scss';

const BlockQuote = ({ children }: PropsWithChildren) => (
  <div className={styles.blockQuote}>{children}</div>
);

export default BlockQuote;
