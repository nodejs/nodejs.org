import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

import ActiveLink from '@node-core/ui-components/Common/ActiveLink';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type NavItemType = 'nav' | 'footer';

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
  target?: HTMLAttributeAnchorTarget | undefined;

  pathname: string;
  Wrapper: LinkLike;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href = '',
  type = 'nav',
  children,
  className,
  target,
  ...props
}) => (
  <ActiveLink
    target={target}
    href={href}
    className={classNames(styles.navItem, styles[type], className)}
    activeClassName={styles.active}
    allowSubPath={href.startsWith('/')}
    {...props}
  >
    <span className={styles.label}>{children}</span>

    {target === '_blank' && <ArrowUpRightIcon className={styles.icon} />}
  </ActiveLink>
);

export default NavItem;
