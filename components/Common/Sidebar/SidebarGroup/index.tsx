import classNames from 'classnames';
import type { FC } from 'react';

import SidebarItem from '@/components/Common/Sidebar/SidebarItem';

import styles from './index.module.css';
import type { ActiveItem, SidebarGroupType } from '..';

type SideBarGroupProps = SidebarGroupType & {
  activeItem?: ActiveItem;
  setActiveItem: (item: ActiveItem) => void;
};

const SidebarGroup: FC<SideBarGroupProps> = ({
  groupName,
  items,
  activeItem,
  setActiveItem,
}) => {
  const handleSideBarItemClick = (title: string) => {
    setActiveItem({ groupName, title });
  };

  return (
    <section className={styles.group}>
      <label className={styles.groupName}>{groupName}</label>
      <ul className={styles.itemList}>
        {items.map(item => (
          <SidebarItem
            key={item.title}
            isActive={
              activeItem?.groupName === groupName &&
              activeItem?.title === item.title
            }
            onClick={handleSideBarItemClick}
          />
        ))}
      </ul>
    </section>
  );
};

export default SidebarGroup;
