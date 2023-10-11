import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type NavItemType = 'nav' | 'footer';

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href,
  type = 'nav',
  children,
  className,
}) => {
  const showIcon = useMemo(
    () => type === 'nav' && /^https?:\/\//.test(href),
    [href, type]
  );

  return (
    <LocalizedLink
      href={href}
      className={classNames(styles.navItem, styles[type], className)}
    >
      <span className={styles.label}>{children}</span>
      {showIcon && <ArrowUpRightIcon className={styles.icon} />}
    </LocalizedLink>
  );
};

export default NavItem;
