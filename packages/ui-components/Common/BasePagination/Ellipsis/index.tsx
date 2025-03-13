import type { FC } from 'react';

import styles from './index.module.css';

const Ellipsis: FC = () => (
  <span aria-hidden="true" className={styles.ellipsis}>
    ...
  </span>
);

export default Ellipsis;
