import classNames from 'classnames';
import type { FC } from 'react';

import styles from './index.module.css';

export type DataTagProps = {
  kind:
    | 'event'
    | 'method'
    | 'property'
    | 'class'
    | 'module'
    | 'classMethod'
    | 'global'
    | 'ctor';
  size?: 'lg' | 'md' | 'sm';
};

// These symbols match up with the types used in
// node core, and the ones defined at
// https://github.com/nodejs/api-docs-tooling/blob/main/src/types.d.ts#L22 (`HeadingMetadataEntry['type']`)
const symbolMap = {
  event: 'E',
  method: 'M',
  property: 'P',
  class: 'C',
  module: 'M',
  classMethod: 'S',
  global: 'G',
  ctor: 'C',
} as const;

const DataTag: FC<DataTagProps> = ({ kind, size = 'md' }) => (
  <div className={classNames(styles.dataTag, styles[size], styles[kind])}>
    <span>{symbolMap[kind]}</span>
  </div>
);

export default DataTag;
