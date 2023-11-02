import type { ComponentProps, FC } from 'react';

import SidebarGroup from '@/components/Common/Sidebar/SidebarGroup';
import type SidebarItem from '@/components/Common/Sidebar/SidebarItem';

import styles from './index.module.css';

type SidebarProps = {
  groups: ComponentProps<typeof SidebarGroup>[];
  activeItem?: ComponentProps<typeof SidebarItem>;
};

const SideBar: FC<SidebarProps> = ({ groups, activeItem }) => {
  return (
    <aside className={styles.sideBar}>
      {groups.map(({ groupName, items }) => (
        <SidebarGroup
          key={groupName}
          groupName={groupName}
          items={items}
          activeItem={activeItem}
        />
      ))}
    </aside>
  );
};

export default SideBar;
