import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC } from 'react';
import { useMemo } from 'react';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type NavItemType = 'nav' | 'footer';

type NavItemProps = {
  href: string;
  label?: string;
  type?: NavItemType;
};

const NavItem: FC<NavItemProps> = ({ href, label, type = 'nav' }) => {
  const showIcon = useMemo(
    () => type === 'nav' && /^https?:\/\//.test(href),
    [href, type]
  );

  return (
    <LocalizedLink
      href={href}
      className={classNames(styles.navItem, styles[type])}
    >
      <span className={styles.label}>{label}</span>
      {showIcon && <ArrowUpRightIcon className={styles.icon} />}
    </LocalizedLink>
  );
};

export default NavItem;
