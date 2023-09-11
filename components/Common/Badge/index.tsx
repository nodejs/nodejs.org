import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type Link from 'next/link';

import LocalizedLink from '@/components/LocalizedLink';
import classNames from 'classnames';

import styles from './index.module.scss';

type BadgeProps = {
  kind?: 'default' | 'warning' | 'error';
  badgeText?: string;
} & ComponentProps<typeof Link>;

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  badgeText,
  children,
  ...args
}) => {
  return (
    <LocalizedLink className={classNames(styles.badge, styles[kind])} {...args}>
      {badgeText && <span className={styles.text}>{badgeText}</span>}
      <span className={styles.message}>{children}</span>
      <ArrowRightIcon className={styles.icon} />
    </LocalizedLink>
  );
};

export default Badge;
