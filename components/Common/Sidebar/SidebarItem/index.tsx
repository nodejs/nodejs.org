import classNames from 'classnames';
import type { FC } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type SidebarItemProps = {
  title: string;
  url: string;
  isActive?: boolean;
};

const SidebarItem: FC<SidebarItemProps> = ({
  url,
  title,
  isActive = false,
}) => (
  <li
    className={classNames(styles.sideBarItem, {
      [styles.active]: isActive,
    })}
  >
    <Link href={url}>{title}</Link>
  </li>
);

export default SidebarItem;
