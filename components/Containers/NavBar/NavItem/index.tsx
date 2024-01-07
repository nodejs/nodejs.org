import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';

import styles from './index.module.css';

type NavItemType = 'nav' | 'footer';

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href = '',
  type = 'nav',
  children,
  className,
}) => (
  <ActiveLink
    href={href}
    className={classNames(styles.navItem, styles[type], className)}
    activeClassName={styles.active}
    allowSubPath={href.startsWith('/')}
  >
    <span className={styles.label}>{children}</span>
    {type === 'nav' && href.startsWith('http') && (
      <ArrowUpRightIcon className={styles.icon} />
    )}
  </ActiveLink>
);

export default NavItem;
