import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useMemo, type FC } from 'react';

import styles from './index.module.css';

export enum NavItemType {
  nav = 'nav',
  footer = 'footer',
}

type NavItemProps = {
  href: string;
  label?: string;
  type?: NavItemType;
};

const NavItem: FC<NavItemProps> = ({ href, label, type = NavItemType.nav }) => {
  const showIcon = useMemo(() => {
    return href.startsWith('http') && type === NavItemType.nav;
  }, [href, type]);

  return (
    <Link href={href} className={classNames(styles.navItem, styles[type])}>
      <span className={styles.label}>{label}</span>
      {showIcon && <ArrowUpRightIcon className={styles.icon} />}
    </Link>
  );
};
export default NavItem;
