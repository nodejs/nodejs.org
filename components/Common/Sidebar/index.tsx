'use client';

import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import Select from '@/components/Common/Select';
import SidebarGroup from '@/components/Common/Sidebar/SidebarGroup';
import { useClientContext } from '@/hooks';
import { useRouter } from '@/navigation.mjs';

import styles from './index.module.css';

type SidebarProps = {
  groups: ComponentProps<typeof SidebarGroup>[];
};

const SideBar: FC<SidebarProps> = ({ groups }) => {
  const t = useTranslations();
  const { pathname } = useClientContext();
  const { push } = useRouter();

  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: items.map(item => ({ value: item.url, label: item.title })),
  }));

  const currentItem = selectItems
    .map(item => item.items)
    .flat()
    .find(item => pathname === item.value);

  return (
    <aside className={styles.sideBar}>
      {groups.map(({ groupName, items }) => (
        <SidebarGroup
          key={groupName.toString()}
          groupName={groupName}
          items={items}
        />
      ))}

      <Select
        label={t('components.common.sidebar.title')}
        values={selectItems}
        defaultValue={currentItem?.value}
        onChange={value => push(value)}
      />
    </aside>
  );
};

export default SideBar;
