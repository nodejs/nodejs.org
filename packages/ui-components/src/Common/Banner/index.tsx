import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

export type BannerProps = {
  type?: 'default' | 'warning' | 'error';
} & HTMLAttributes<HTMLElement>;

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  children,
  ...props
}) => (
  <section
    className={`${styles.banner} ${styles[type] || styles.default}`}
    {...props}
  >
    {children}
  </section>
);

export default Banner;
