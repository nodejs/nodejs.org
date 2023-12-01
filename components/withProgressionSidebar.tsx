import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import ProgressionSideBar from '@/components/Common/ProgressionSideBar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type WithProgressionSideBarProps = {
  navKey: NavigationKeys;
  context?: Record<string, RichTranslationValues>;
};

const WithProgressionSideBar: FC<WithProgressionSideBarProps> = ({
  navKey,
  context,
}) => {
  const { getSideNavigation } = useSiteNavigation();

  const [[, sidebarNavigation]] = getSideNavigation([navKey], context);

  const mappedProgressionSideBarItems = sidebarNavigation.items.map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, { label, link }]) => ({ title: label, url: link })),
    })
  );

  return <ProgressionSideBar groups={mappedProgressionSideBarItems} />;
};

export default WithProgressionSideBar;
