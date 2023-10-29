import classNames from 'classnames';
import type { FC } from 'react';

import LocalizedLink from '@/components/LocalizedLink';
import type { SidebarItemType } from '@/types/sidebar';

import styles from './index.module.css';

type SideBarItemProps = SidebarItemType & {
  isActive?: boolean;
  handleSideBarItemClick: (title: string) => void;
};

const SidebarItem: FC<SideBarItemProps> = ({
  url,
  title,
  handleSideBarItemClick,
  isActive,
}) => {
  return (
    <li
      className={classNames(styles.sideBarItem, {
        [styles.active]: isActive,
      })}
      onClick={() => handleSideBarItemClick(title)}
    >
      <LocalizedLink href={url}>{title}</LocalizedLink>
    </li>
  );
};

export default SidebarItem;
