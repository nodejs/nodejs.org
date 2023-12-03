import type { ComponentProps, FC } from 'react';

import ProgressionSidebarGroup from '@/components/Common/ProgressionSidebar/ProgressionSidebarGroup';
import WithSidebarSelect from '@/components/withSidebarSelect';

import styles from './index.module.css';

type ProgressionSidebarProps = {
  groups: ComponentProps<typeof ProgressionSidebarGroup>[];
};

const ProgressionSidebar: FC<ProgressionSidebarProps> = ({ groups }) => (
  <nav className={styles.wrapper}>
    {groups.map(({ groupName, items }) => (
      <ProgressionSidebarGroup
        key={groupName.toString()}
        groupName={groupName}
        items={items}
      />
    ))}

    <WithSidebarSelect groups={groups} />
  </nav>
);

export default ProgressionSidebar;
