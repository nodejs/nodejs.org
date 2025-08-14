import Image from 'next/image';
import type { FC } from 'react';

import styles from './index.module.css';

const Turtle: FC = () => (
  <div className={styles.turtle}>
    <Image
      className={styles.image}
      src="/static/images/node-mascot.svg"
      alt="The Node.js mascot"
      height={115}
      width={100}
    />
  </div>
);

export default Turtle;
