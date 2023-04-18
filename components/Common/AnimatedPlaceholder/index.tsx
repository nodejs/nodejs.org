import styles from './index.module.scss';
import type { FC, ReactNode } from 'react';

type AnimatedPlaceholderProps = {
  children?: ReactNode;
  width?: number;
  height?: number;
};

const AnimatedPlaceholder: FC<AnimatedPlaceholderProps> = props => (
  <div
    className={styles.placeholder}
    style={{ width: `${props.width}px`, height: `${props.height}px` }}
  >
    {props.children || (
      <>
        <div className={styles.placeholderImage} />
        <div className={styles.placeholderText}>
          <div className={styles.placeholderTextLine} />
          <div className={styles.placeholderTextLine} />
        </div>
      </>
    )}
  </div>
);

export default AnimatedPlaceholder;
