import WithNoScriptSelect from '#ui/Common/Select/NoScriptSelect';
import SidebarGroup from '#ui/Containers/Sidebar/SidebarGroup';

import type { LinkLike } from '#ui/types';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type SidebarProps = {
  groups: Array<
    Pick<ComponentProps<typeof SidebarGroup>, 'items' | 'groupName'>
  >;
  pathname?: string;
  title: string;
  onSelect: (value: string) => void;
  as?: LinkLike;
  placeholder?: string;
};

const SideBar: FC<PropsWithChildren<SidebarProps>> = ({
  groups,
  pathname,
  title,
  onSelect,
  as,
  children,
  placeholder,
}) => {
  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: items.map(({ label, link }) => ({ value: link, label })),
  }));

  const currentItem = selectItems
    .flatMap(item => item.items)
    .find(item => pathname === item.value);

  return (
    <aside className={styles.wrapper}>
      {children}

      {selectItems.length > 0 && (
        <WithNoScriptSelect
          label={title}
          values={selectItems}
          defaultValue={currentItem?.value}
          placeholder={placeholder}
          onChange={onSelect}
          className={styles.mobileSelect}
          as={as}
        />
      )}

      {groups.map(({ groupName, items }) => (
        <SidebarGroup
          key={groupName.toString()}
          groupName={groupName}
          items={items}
          pathname={pathname}
          as={as}
          className={styles.navigation}
        />
      ))}
    </aside>
  );
};

export default SideBar;
