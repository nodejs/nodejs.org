'use client';

import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import SidebarGroup from '@/components/Containers/Sidebar/SidebarGroup';
import WithRouterSelect from '@/components/withRouterSelect';
import { usePathname } from '@/navigation.mjs';

import styles from './index.module.css';

type SidebarProps = {
  groups: Array<ComponentProps<typeof SidebarGroup>>;
};

const SideBar: FC<SidebarProps> = ({ groups }) => {
  const t = useTranslations();
  const pathname = usePathname();

  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: items.map(({ label, link }) => ({ value: link, label })),
  }));

  const currentItem = selectItems
    .map(item => item.items)
    .flat()
    .find(item => pathname === item.value);

  return (
    <div className={styles.wrapper}>
      <aside>
        <nav>
          {selectItems.length > 0 && (
            <WithRouterSelect
              label={t('components.common.sidebar.title')}
              values={selectItems}
              defaultValue={currentItem?.value}
            />
          )}

          {groups.map(({ groupName, items }) => (
            <SidebarGroup
              key={groupName.toString()}
              groupName={groupName}
              items={items}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
