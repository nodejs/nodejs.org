import type { ComponentProps, FC } from 'react';

import ProgressionSidebarItem from '@/components/Containers/ProgressionSidebar/ProgressionSidebarItem';

import styles from './index.module.css';

type ProgressionSidebarGroupProps = {
  name: string;
  items: ComponentProps<typeof ProgressionSidebarItem>[];
};

const ProgressionSidebarGroup: FC<ProgressionSidebarGroupProps> = ({
  name,
  items,
}) => (
  <div className={styles.group}>
    {name}
    <div className={styles.items}>
      {items.map(({ url, title }) => (
        <ProgressionSidebarItem key={url} url={url} title={title} />
      ))}
    </div>
  </div>
);

export default ProgressionSidebarGroup;
