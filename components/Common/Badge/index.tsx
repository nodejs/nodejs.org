import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import LocalizedLink from '@/components/LocalizedLink';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type Link from 'next/link';

import styles from './index.module.css';

type BadgeProps = {
  kind?: 'default' | 'warning' | 'error';
  badgeText?: string;
} & ComponentProps<typeof Link>;

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  badgeText,
  children,
  ...args
}) => (
  <LocalizedLink className={`${styles.wrapper} ${styles[kind]}`} {...args}>
    {badgeText && <span className={styles.badge}>{badgeText}</span>}
    <span className={styles.message}>{children}</span>
    <ArrowRightIcon className={styles.icon} />
  </LocalizedLink>
);

export default Badge;
