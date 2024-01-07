'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import { useClientContext } from '@/hooks';
import { useRouter } from '@/navigation.mjs';
import type { FormattedMessage } from '@/types';

type SelectItem = {
  label: FormattedMessage;
  link: string;
};

type WithSidebarSelectProps = {
  groups: Array<{ groupName: FormattedMessage; items: Array<SelectItem> }>;
};

const WithSidebarSelect: FC<WithSidebarSelectProps> = ({ groups }) => {
  const t = useTranslations();

  const { pathname } = useClientContext();
  const { push } = useRouter();

  const selectItems = groups.map(({ items, groupName }) => ({
    label: groupName,
    items: items.map(({ label, link }) => ({ value: link, label })),
  }));

  const currentItem = selectItems
    .map(item => item.items)
    .flat()
    .find(item => pathname === item.value);

  return (
    <Select
      label={t('components.common.sidebar.title')}
      values={selectItems}
      defaultValue={currentItem?.value}
      onChange={value => push(value)}
    />
  );
};

export default WithSidebarSelect;
