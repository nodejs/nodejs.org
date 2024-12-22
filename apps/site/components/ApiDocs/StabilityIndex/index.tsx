import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type StabilityIndexProps = PropsWithChildren<{
  level: number;
}>;

const StabilityIndex: FC<StabilityIndexProps> = ({ level, children }) => (
  <div
    className={classNames(
      styles.stabilityIndex,
      styles[`stabilityLevel${level}`]
    )}
  >
    <span className={styles.indexLevel}>{level}</span>
    {children}
  </div>
);

export default StabilityIndex;
