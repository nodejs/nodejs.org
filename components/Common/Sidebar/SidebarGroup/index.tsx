import type { ComponentProps, FC } from 'react';

import SidebarItem from '@/components/Common/Sidebar/SidebarItem';

import styles from './index.module.css';

type SidebarGroupProps = {
  groupName: string;
  items: ComponentProps<typeof SidebarItem>[];
  activeItem?: ComponentProps<typeof SidebarItem>;
};

const SidebarGroup: FC<SidebarGroupProps> = ({
  groupName,
  items,
  activeItem,
}) => {
  return (
    <section className={styles.group}>
      <label className={styles.groupName}>{groupName}</label>
      <ul className={styles.itemList}>
        {items.map(({ title, url }) => (
          <SidebarItem
            key={title}
            title={title}
            url={url}
            isActive={
              activeItem?.title === title && activeItem.url === activeItem.url
            }
          />
        ))}
      </ul>
    </section>
  );
};

export default SidebarGroup;
