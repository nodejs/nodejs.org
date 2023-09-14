import LocalizedLink from '@/components/LocalizedLink';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import styles from './index.module.scss';
import type { FC } from 'react';

type BannerProps = {
  type: 'default' | 'error' | 'warning';
  text: string;
  url?: string;
};

const Banner: FC<BannerProps> = ({ type, text, url = '' }) => (
  <div className={`${styles.banner} ${styles[type] || styles.default}`}>
    {(url.length > 0 && <LocalizedLink href={url}>{text}</LocalizedLink>) ||
      text}
    {url.length > 0 && <ArrowUpRightIcon />}
  </div>
);

export default Banner;
