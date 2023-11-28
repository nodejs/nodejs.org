import type { FC } from 'react';

import SideBar from '@/components/Common/Sidebar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

const WithSideBar: FC<{ keys: NavigationKeys[] }> = ({ keys }) => {
  const { getSideNavigation } = useSiteNavigation();

  const mappedSidebarItems = getSideNavigation(keys).map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, { label, link }]) => ({ title: label, url: link })),
    })
  );

  return <SideBar groups={mappedSidebarItems} />;
};

export default WithSideBar;
