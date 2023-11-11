import classNames from 'classnames';
import type { FC } from 'react';

import SidebarItem from '@/components/Common/Sidebar/SidebarItem';
import type { SidebarItemProps } from '@/components/Common/Sidebar/SidebarItem';

import styles from './index.module.css';

export type SidebarGroupProps = {
  groupName: string;
  items: SidebarItemProps[];
};

const SidebarGroup: FC<SidebarGroupProps> = ({ groupName, items }) => {
  return (
    <li className={classNames(styles.group)}>
      <span className={classNames(styles.groupName)}>{groupName}</span>
      <ul className={classNames(styles.items)}>
        {items.map((item, key) => (
          <SidebarItem key={key} {...item} />
        ))}
      </ul>
    </li>
  );
};

export default SidebarGroup;
