'use client';

import ProgressionSidebar from '@node-core/ui-components/Common/ProgressionSidebar';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { RichTranslationValues } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';
import { useSiteNavigation } from '@/hooks/server';
import { useRouter } from '@/navigation.mjs';
import type { NavigationKeys } from '@/types';

type Group = ComponentProps<typeof ProgressionSidebar>['groups'][number];

type WithProgressionSidebarProps =
  | {
      navKey: NavigationKeys;
      context?: Record<string, RichTranslationValues>;
      groups?: never;
    }
  | {
      groups: Array<Group>;
      navKey?: never;
      context?: never;
    };

const WithProgressionSidebar: FC<WithProgressionSidebarProps> = props => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  const { push } = useRouter();

  let groups: Array<Group> = [];

  if ('navKey' in props && props.navKey) {
    const [[, sidebarNavigation]] = getSideNavigation(
      [props.navKey],
      props.context
    );

    groups = sidebarNavigation.items.map(([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    }));
  } else if ('groups' in props) {
    groups = props.groups;
  }

  return (
    <ProgressionSidebar
      groups={groups}
      pathname={pathname?.replace(`/${locale}`, '')}
      title={t('components.common.sidebar.title')}
      onSelect={push}
      as={Link}
    />
  );
};

export default WithProgressionSidebar;
