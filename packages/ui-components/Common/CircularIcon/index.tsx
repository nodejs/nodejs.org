import classNames from 'classnames';

import styles from './index.module.css';

interface CircularIconProps {
  symbol: string;
  color: string;
  size?: 'lg' | 'md' | 'sm';
}

export default function CircularIcon({
  symbol,
  color,
  size = 'md',
}: CircularIconProps) {
  return (
    <div
      className={classNames(styles.icon, styles[size])}
      style={{ backgroundColor: color }}
    >
      <span>{symbol}</span>
    </div>
  );
}
