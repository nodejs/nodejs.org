import styles from './index.module.scss';
import type { FC } from 'react';

type DataTagProps = { tag: 'E' | 'C' | 'M' };

const DataTag: FC<DataTagProps> = props => (
  <span className={styles.dataTag} data-tag={props.tag}>
    {props.tag}
  </span>
);

export default DataTag;
