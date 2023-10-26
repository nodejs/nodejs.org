import classNames from 'classnames';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';

import styles from './index.module.css';

type PreviewProps = {
  type?: 'announcement' | 'release' | 'vulnerability';
  title: ReactNode;
  className?: string;
};

const Preview: FC<PreviewProps> = ({
  type = 'announcement',
  title,
  className,
}) => (
  <div className={classNames(styles.root, className)}>
    <span className={classNames(styles.overlay, styles[type])} />
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          className={styles.image}
          src="/static/images/logos/js-white.svg"
          alt="Node.js"
          layout="fill"
        />
      </div>
      <h2>{title}</h2>
    </div>
  </div>
);

export default Preview;
