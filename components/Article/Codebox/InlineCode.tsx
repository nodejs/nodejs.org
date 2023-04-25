import styles from './index.module.scss';
import type { PropsWithChildren } from 'react';

const InlineCode = ({ children }: PropsWithChildren) => (
  <code className={styles.code}>{children}</code>
);

export default InlineCode;
