import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import SideBar from '@/components/Common/Sidebar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type WithSideBarProps = {
  keys: NavigationKeys[];
  context?: Record<string, RichTranslationValues>;
};

const WithSideBar: FC<WithSideBarProps> = ({ keys, context }) => {
  const { getSideNavigation } = useSiteNavigation();

  const mappedSidebarItems = getSideNavigation(keys, context).map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, { label, link }]) => ({ title: label, url: link })),
    })
  );

  return <SideBar groups={mappedSidebarItems} />;
};

export default WithSideBar;
