import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

export type BannerProps = {
  type?: 'default' | 'warning' | 'error';
};

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  children,
}) => (
  <div className={`${styles.banner} ${styles[type] || styles.default}`}>
    {children}
  </div>
);

export default Banner;
