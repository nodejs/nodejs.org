import type { ComponentProps, FC } from 'react';

import ProgressionSidebarGroup from '@/components/Containers/ProgressionSidebar/ProgressionSidebarGroup';

import styles from './index.module.css';

type ProgressionSidebarProps = {
  groups: ComponentProps<typeof ProgressionSidebarGroup>[];
};

const ProgressionSidebar: FC<ProgressionSidebarProps> = ({ groups }) => (
  <nav className={styles.wrapper}>
    {groups.map(({ name, items }) => (
      <ProgressionSidebarGroup key={name} name={name} items={items} />
    ))}
  </nav>
);

export default ProgressionSidebar;
