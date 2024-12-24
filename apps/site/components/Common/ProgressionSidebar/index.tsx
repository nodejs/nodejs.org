'use client';

import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';
import { useRef } from 'react';

import ProgressionSidebarGroup from '@/components/Common/ProgressionSidebar/ProgressionSidebarGroup';
import WithRouterSelect from '@/components/withRouterSelect';
import { useClientContext, useNavigationState } from '@/hooks';

import styles from './index.module.css';

type ProgressionSidebarProps = {
  groups: Array<ComponentProps<typeof ProgressionSidebarGroup>>;
};

const ProgressionSidebar: FC<ProgressionSidebarProps> = ({ groups }) => {
  const t = useTranslations();
  const { pathname } = useClientContext();
  const ref = useRef<HTMLElement>(null);

  useNavigationState('progressionSidebar', ref);

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
      <WithRouterSelect
        label={t('components.common.sidebar.title')}
        values={selectItems}
        defaultValue={currentItem?.value}
      />

      {groups.map(({ groupName, items }) => (
        <ProgressionSidebarGroup
          key={groupName.toString()}
          groupName={groupName}
          items={items}
        />
      ))}
    </nav>
  );
};

export default ProgressionSidebar;
