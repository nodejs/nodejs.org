'use client';

import { useRef, type ComponentProps, type FC } from 'react';

import styles from './index.module.css';

import ProgressionSidebarGroup from '#Common/ProgressionSidebar/ProgressionSidebarGroup';
import Select from '#Common/Select';
import type { LinkLike } from '#types';

type ProgressionSidebarProps = {
  groups: Array<ComponentProps<typeof ProgressionSidebarGroup>>;
  pathname?: string;
  title: string;
  onSelect: (value: string) => void;
  as?: LinkLike;
};

const ProgressionSidebar: FC<ProgressionSidebarProps> = ({
  groups,
  pathname,
  title,
  onSelect,
  as,
}) => {
  const ref = useRef<HTMLElement>(null);
  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: items.map(({ label, link }) => ({ value: link, label })),
  }));

  const currentItem = selectItems
    .map(item => item.items)
    .flat()
    .find(item => pathname === item.value);

  return (
    <nav className={styles.wrapper} ref={ref}>
      <Select
        label={title}
        onChange={onSelect}
        values={selectItems}
        defaultValue={currentItem?.value}
      />

      {groups.map(({ groupName, items }) => (
        <ProgressionSidebarGroup
          key={groupName.toString()}
          groupName={groupName}
          items={items}
          as={as}
          pathname={pathname}
        />
      ))}
    </nav>
  );
};

export default ProgressionSidebar;
