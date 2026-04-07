import WithNoScriptSelect from '#ui/Common/Select/NoScriptSelect';
import SidebarGroup from '#ui/Containers/Sidebar/SidebarGroup';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type { ComponentProps, FC, PropsWithChildren, RefObject } from 'react';

import styles from './index.module.css';

type SidebarItemType = {
  label: FormattedMessage;
  link: string;
  items?: Array<SidebarItemType>;
};

const flattenItems = (
  items: Array<SidebarItemType>
): Array<SidebarItemType> => {
  return items.flatMap((item: SidebarItemType) =>
    item.items && item.items.length ? flattenItems(item.items) : [item]
  );
};

type SidebarProps = {
  groups: Array<
    Pick<ComponentProps<typeof SidebarGroup>, 'items' | 'groupName'>
  >;
  pathname?: string;
  title: string;
  onSelect: (value: string) => void;
  as?: LinkLike;
  placeholder?: string;
  ref: RefObject<HTMLElement | null>;
};

const SideBar: FC<PropsWithChildren<SidebarProps>> = ({
  groups,
  pathname,
  title,
  onSelect,
  as,
  children,
  placeholder,
  ...props
}) => {
  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: flattenItems(items as Array<SidebarItemType>).map(
      ({ label, link }) => ({ value: link, label })
    ),
  }));

  const currentItem = selectItems
    .flatMap(item => item.items)
    .find(item => pathname === item.value);

  return (
    <aside {...props} className={styles.wrapper}>
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
