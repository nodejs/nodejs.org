import type { ComponentProps, FC } from 'react';

import ProgressionSidebarGroup from '@/components/Common/ProgressionSidebar/ProgressionSidebarGroup';

import styles from './index.module.css';

type ProgressionSidebarProps = {
  groups: Omit<ComponentProps<typeof ProgressionSidebarGroup>, 'activeUrls'>[];
  activeUrls: string[];
};

const ProgressionSidebar: FC<ProgressionSidebarProps> = ({
  groups,
  activeUrls,
}) => (
  <nav className={styles.wrapper}>
    {groups.map(({ name, items }) => (
      <ProgressionSidebarGroup
        key={name}
        name={name}
        items={items}
        activeUrls={activeUrls}
      />
    ))}
  </nav>
);

export default ProgressionSidebar;
