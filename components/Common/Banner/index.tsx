import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { FC, PropsWithChildren } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type BannerProps = {
  link?: string;
  type?: 'default' | 'warning' | 'error';
};

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  link,
  children,
}) => (
  <div className={`${styles.banner} ${styles[type] || styles.default}`}>
    {link ? <Link href={link}>{children}</Link> : children}
    {link && <ArrowUpRightIcon />}
  </div>
);

export default Banner;
