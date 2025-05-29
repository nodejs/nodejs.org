import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type DetailsProps = {
  summary: React.ReactNode;
};

const Details: FC<PropsWithChildren<DetailsProps>> = ({
  children,
  summary,
}) => (
  <details className={styles.root}>
    <summary>
      <h3>{summary}</h3>
    </summary>
    <div className={styles.detail}>{children}</div>
  </details>
);

export default Details;
