import type { Url } from 'url';

import { useState } from 'react';
import type { FC } from 'react';

import styles from './index.module.css';
import SidebarGroup from './SidebarGroup';

export type SidebarItemType = {
  url: string | Url;
  title: string;
};

export type SidebarGroupType = {
  groupName: string;
  items: SidebarItemType[];
};

export type ActiveItem = Pick<SidebarGroupType, 'groupName'> &
  Pick<SidebarItemType, 'title'>;

type SidebarProps = {
  groups: SidebarGroupType[];
};

const SideBar: FC<SidebarProps> = ({ groups }) => {
  const [activeItem, setActiveItem] = useState<ActiveItem>();

  return (
    <aside className={styles.sideBar}>
      {groups.map(({ groupName, items }) => (
        <SidebarGroup
          key={groupName}
          groupName={groupName}
          items={items}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      ))}
    </aside>
  );
};

export default SideBar;
