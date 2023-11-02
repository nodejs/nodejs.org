import classNames from 'classnames';
import type { FC } from 'react';

import LocalizedLink from '@/components/LocalizedLink';

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
    <LocalizedLink href={url}>{title}</LocalizedLink>
  </li>
);

export default SidebarItem;
