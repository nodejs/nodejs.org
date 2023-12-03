import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import SideBar from '@/components/Common/Sidebar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type WithSidebarProps = {
  navKeys: NavigationKeys[];
  context?: Record<string, RichTranslationValues>;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context }) => {
  const { getSideNavigation } = useSiteNavigation();

  const mappedSidebarItems = getSideNavigation(navKeys, context).map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return <SideBar groups={mappedSidebarItems} />;
};

export default WithSidebar;
