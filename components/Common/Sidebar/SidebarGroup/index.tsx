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
    <div className={classNames(styles.group)}>
      <div className={classNames(styles.groupName)}>{groupName}</div>
      <div className={classNames(styles.items)}>
        {items.map((item, key) => (
          <SidebarItem key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SidebarGroup;
