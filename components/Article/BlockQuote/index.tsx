import styles from './index.module.scss';
import type { FC, PropsWithChildren } from 'react';

const BlockQuote: FC<PropsWithChildren> = props => (
  <div className={styles.blockQuote}>{props.children}</div>
);

export default BlockQuote;
