import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
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
}) => {
  const t = useTranslations('components.common.banner');

  return (
    <div className={classNames(styles.banner, styles[type])}>
      <span className={styles.content}>
        {link ? <Link href={link}>{children}</Link> : children}
        {link && <ArrowUpRightIcon />}
      </span>
      <button
        arria-label={t('hide')}
        className={styles.close}
        title={t('hide')}
      >
        <XMarkIcon />
      </button>
    </div>
  );
};

export default Banner;
