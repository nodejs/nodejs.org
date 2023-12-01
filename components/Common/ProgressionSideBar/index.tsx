import type { ComponentProps, FC } from 'react';

import ProgressionSidebarGroup from '@/components/Common/ProgressionSideBar/ProgressionSideBarGroup';

import styles from './index.module.css';

type ProgressionSideBarProps = {
  groups: ComponentProps<typeof ProgressionSidebarGroup>[];
};

const ProgressionSideBar: FC<ProgressionSideBarProps> = ({ groups }) => (
  <nav className={styles.wrapper}>
    {groups.map(({ groupName, items }) => (
      <ProgressionSidebarGroup
        key={groupName.toString()}
        groupName={groupName}
        items={items}
      />
    ))}
  </nav>
);

export default ProgressionSideBar;
