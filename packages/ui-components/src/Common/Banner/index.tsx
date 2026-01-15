import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

export type BannerProps = {
  type?: 'default' | 'warning' | 'error';
};

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  children,
}) => (
  <section
    className={`${styles.banner} ${styles[type] || styles.default}`}
    role="region"
    aria-label="Announcement"
  >
    {children}
  </section>
);

export default Banner;
