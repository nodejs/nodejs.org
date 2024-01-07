import type { ComponentProps, FC } from 'react';

import SidebarGroup from '@/components/Containers/Sidebar/SidebarGroup';
import WithSidebarSelect from '@/components/withSidebarSelect';

import styles from './index.module.css';

type SidebarProps = {
  groups: Array<ComponentProps<typeof SidebarGroup>>;
};

const SideBar: FC<SidebarProps> = ({ groups }) => (
  <aside className={styles.wrapper}>
    {groups.map(({ groupName, items }) => (
      <SidebarGroup
        key={groupName.toString()}
        groupName={groupName}
        items={items}
      />
    ))}

    <WithSidebarSelect groups={groups} />
  </aside>
);

export default SideBar;
