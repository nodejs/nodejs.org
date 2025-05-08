import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

import SidebarItem from '#Containers/Sidebar/SidebarItem';
import type { FormattedMessage, LinkLike } from '#types';

type SidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<Omit<ComponentProps<typeof SidebarItem>, 'as' | 'pathname'>>;
  as?: LinkLike;
  pathname?: string;
};

const SidebarGroup: FC<SidebarGroupProps> = ({
  groupName,
  items,
  ...props
}) => (
  <section className={styles.group}>
    <label className={styles.groupName}>{groupName}</label>
    <ul className={styles.itemList}>
      {items.map(({ label, link }) => (
        <SidebarItem key={link} label={label} link={link} {...props} />
      ))}
    </ul>
  </section>
);

export default SidebarGroup;
