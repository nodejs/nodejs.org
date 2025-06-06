import type { ComponentProps, FC } from 'react';

import SidebarItem from '#ui/Containers/Sidebar/SidebarItem';
import type { FormattedMessage, LinkLike } from '#ui/types';

import styles from './index.module.css';

type SidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<Omit<ComponentProps<typeof SidebarItem>, 'as' | 'pathname'>>;
  as?: LinkLike;
  pathname?: string;
  showProgressionIcons?: boolean;
};

const SidebarGroup: FC<SidebarGroupProps> = ({
  groupName,
  items,
  showProgressionIcons = false,
  ...props
}) => (
  <section className={styles.group}>
    <label className={styles.groupName}>{groupName}</label>
    <ul className={styles.itemList}>
      {items.map(({ label, link }) => (
        <SidebarItem
          key={link}
          label={label}
          link={link}
          showProgressionIcon={showProgressionIcons}
          {...props}
        />
      ))}
    </ul>
  </section>
);

export default SidebarGroup;
