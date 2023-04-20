import styles from './index.module.scss';
import type { FC } from 'react';

type DataTagProps = { tag: 'E' | 'C' | 'M' };

const DataTag: FC<DataTagProps> = ({ tag }) => (
  <span className={styles.dataTag} data-tag={tag}>
    {tag}
  </span>
);

export default DataTag;
