import classNames from 'classnames';

import styles from './index.module.css';

export type CircularIconProps = {
  kind:
    | 'event'
    | 'method'
    | 'property'
    | 'class'
    | 'module'
    | 'classMethod'
    | 'ctor';
  size?: 'lg' | 'md' | 'sm';
};

const symbolMap = {
  event: 'E',
  method: 'M',
  property: 'P',
  class: 'C',
  module: 'M',
  classMethod: 'S',
  ctor: 'C',
} as const;

export default function CircularIcon({ kind, size = 'md' }: CircularIconProps) {
  return (
    <div className={classNames(styles.icon, styles[size], styles[kind])}>
      <span>{symbolMap[kind]}</span>
    </div>
  );
}
