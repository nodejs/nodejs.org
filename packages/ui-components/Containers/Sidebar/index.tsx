import type { ComponentProps, FC } from 'react';

import Select from '@node-core/ui-components/Common/Select';
import SidebarGroup from '@node-core/ui-components/Containers/Sidebar/SidebarGroup';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type SidebarProps = {
  groups: Array<Omit<ComponentProps<typeof SidebarGroup>, 'as' | 'pathname'>>;
  pathname?: string;
  title: string;
  onSelect: (value: string) => void;
  as?: LinkLike;
};

const SideBar: FC<SidebarProps> = ({
  groups,
  pathname,
  title,
  onSelect,
  as,
}) => {
  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: items.map(({ label, link }) => ({ value: link, label })),
  }));

  const currentItem = selectItems
    .map(item => item.items)
    .flat()
    .find(item => pathname === item.value);

  return (
    <aside className={styles.wrapper}>
      {selectItems.length > 0 && (
        <Select
          label={title}
          values={selectItems}
          defaultValue={currentItem?.value}
          onChange={onSelect}
        />
      )}

      {groups.map(({ groupName, items }) => (
        <SidebarGroup
          key={groupName.toString()}
          groupName={groupName}
          items={items}
          pathname={pathname}
          as={as}
        />
      ))}
    </aside>
  );
};

export default SideBar;
