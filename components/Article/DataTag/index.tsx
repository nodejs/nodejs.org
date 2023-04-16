import React from 'react';
import styles from './index.module.scss';

interface Props {
  tag: 'E' | 'C' | 'M';
}

const DataTag = ({ tag }: Props) => (
  <span className={styles.dataTag} data-tag={tag}>
    {tag}
  </span>
);

export default DataTag;
