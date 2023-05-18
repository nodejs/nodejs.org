import styles from './index.module.scss';
import type { FC, PropsWithChildren } from 'react';

const InlineCode: FC<PropsWithChildren> = ({ children }) => (
  <code className={styles.code}>{children}</code>
);

export default InlineCode;
