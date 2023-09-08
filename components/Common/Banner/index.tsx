import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import styles from './index.module.scss';
import type { FC } from 'react';

type BannerProps = {
  type: 'default' | 'error' | 'warning';
  text: string;
  url: string;
};

const Banner: FC<BannerProps> = ({ type, text, url }) => (
  <div className={`${styles.banner} ${styles[type]}`}>
    <Link href={url}>{text}</Link>
    <ArrowUpRightIcon />
  </div>
);

export default Banner;
