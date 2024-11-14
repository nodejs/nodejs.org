import type { FormattedMessage } from '@node-core/ui-components/types';
import type { ComponentProps, FC } from 'react';

import SidebarItem from '@/components/Containers/Sidebar/SidebarItem';

import styles from './index.module.css';

type SidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<ComponentProps<typeof SidebarItem>>;
};

const SidebarGroup: FC<SidebarGroupProps> = ({ groupName, items }) => (
  <section className={styles.group}>
    <label className={styles.groupName}>{groupName}</label>
    <ul className={styles.itemList}>
      {items.map(({ label, link }) => (
        <SidebarItem key={link} label={label} link={link} />
      ))}
    </ul>
  </section>
);

export default SidebarGroup;
