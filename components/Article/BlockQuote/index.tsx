import type { PropsWithChildren } from 'react';
import styles from './index.module.scss';

const BlockQuote = ({ children }: PropsWithChildren) => (
  <blockquote className={styles.blockQuote}>{children}</blockquote>
);

export default BlockQuote;
