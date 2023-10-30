import classNames from 'classnames';
import type { FC } from 'react';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';
import type { SidebarItemType } from '..';

type SideBarItemProps = SidebarItemType & {
  isActive?: boolean;
  onClick: (title: string) => void;
};

const SidebarItem: FC<SideBarItemProps> = ({
  url,
  title,
  onClick,
  isActive,
}) => (
  <li
    className={classNames(styles.sideBarItem, {
      [styles.active]: isActive,
    })}
    onClick={() => onClick(title)}
  >
    <LocalizedLink href={url}>{title}</LocalizedLink>
  </li>
);

export default SidebarItem;
