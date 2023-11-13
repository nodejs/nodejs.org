import classNames from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';

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
