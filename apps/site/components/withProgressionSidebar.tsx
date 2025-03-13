'use client';

import ProgressionSidebar from '@node-core/ui-components/Common/ProgressionSidebar';
import { usePathname } from 'next/navigation';
import { useTranslations, type RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import { useSiteNavigation } from '@/hooks/server';
import { useRouter } from '@/navigation.mjs';
import type { NavigationKeys } from '@/types';

type WithProgressionSidebarProps = {
  navKey: NavigationKeys;
  context?: Record<string, RichTranslationValues>;
};

const WithProgressionSidebar: FC<WithProgressionSidebarProps> = ({
  navKey,
  context,
}) => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname();
  const t = useTranslations();
  const { push } = useRouter();
  const [[, sidebarNavigation]] = getSideNavigation([navKey], context);

  const mappedProgressionSidebarItems = sidebarNavigation.items.map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return (
    <ProgressionSidebar
      groups={mappedProgressionSidebarItems}
      pathname={pathname!}
      title={t('components.common.sidebar.title')}
      onSelect={push}
    />
  );
};

export default WithProgressionSidebar;
