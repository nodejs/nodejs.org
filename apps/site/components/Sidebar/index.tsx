import SidebarContainer from '@node-core/ui-components/Containers/Sidebar';
import { getTranslations } from 'next-intl/server';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import { getSideNavigation } from '#site/util/navigation';

import type { NavigationKeys } from '#site/types';
import type { NavigationItem } from '#site/util/navigation';
import type { FC } from 'react';

import ScrollRestore from './ScrollRestore';

type SidebarProps = {
  navKeys: Array<NavigationKeys>;
};

const toGroup = ({ label, items }: NavigationItem) => ({
  groupName: label,
  items,
});

const Sidebar: FC<SidebarProps> = async ({ navKeys }) => {
  const t = await getTranslations();
  const { frontmatter, pathname } = getClientContext();

  const sideNavigation = getSideNavigation(t, navKeys);

  // If there's only a single navigation key, use its sub-items as our navigation
  const groups = (
    navKeys.length === 1 ? sideNavigation[0].items : sideNavigation
  ).map(toGroup);

  return (
    <SidebarContainer
      groups={groups}
      pathname={pathname}
      title={t('components.common.sidebar.title')}
      placeholder={frontmatter?.title}
      as={Link}
    >
      <ScrollRestore />
    </SidebarContainer>
  );
};

export default Sidebar;
