'use client';

import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import { usePathname } from 'next/navigation';
import { useTranslations, type RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { useSiteNavigation } from '@/hooks/server';
import { useRouter } from '@/navigation.mjs';
import type { NavigationKeys } from '@/types';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
  context?: Record<string, RichTranslationValues>;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context }) => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname()!;
  const t = useTranslations();
  const { push } = useRouter();

  const mappedSidebarItems = getSideNavigation(navKeys, context).map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return (
    <Sidebar
      groups={mappedSidebarItems}
      pathname={pathname}
      title={t('components.common.sidebar.title')}
      onSelect={value => push(value)}
      as={Link}
    />
  );
};

export default WithSidebar;
