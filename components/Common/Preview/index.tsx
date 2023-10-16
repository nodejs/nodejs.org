import classNames from 'classnames';
import Image from 'next/image';
import type { FC } from 'react';

import { useRouter } from '@/hooks/useRouter';

import styles from './index.module.css';

type PreviewProps = {
  type?: 'announcement' | 'release' | 'vulnerability';
  title: string;
};

const Preview: FC<PreviewProps> = ({ type = 'announcement', title }) => {
  const { basePath } = useRouter();

  return (
    <div className={classNames(styles.root, styles[type])}>
      <div className={styles.container}>
        <Image
          className={styles.logo}
          priority
          width="71"
          height="80"
          src={`${basePath}/static/images/logos/js-white.svg`}
          alt="Node.js"
        />
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Preview;
