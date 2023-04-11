import React from 'react';
import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

const AnimatedPlaceholder = ({ children, width = 400, height = 50 }: Props) => (
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
