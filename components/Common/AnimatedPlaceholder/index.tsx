import styles from './index.module.scss';
import type { FC, ReactNode } from 'react';

type AnimatedPlaceholderProps = {
  children?: ReactNode;
  width?: number;
  height?: number;
};

const AnimatedPlaceholder: FC<AnimatedPlaceholderProps> = ({
  children,
  width,
  height,
}) => (
  <div
    className={styles.placeholder}
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    {children || (
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
