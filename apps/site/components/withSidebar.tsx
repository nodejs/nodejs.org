'use client';

import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import CollapsedSidebarRail from '#site/components/Common/CollapsedSidebarRail';
import SidebarToggleButton from '#site/components/Common/SidebarToggleButton';
import Link from '#site/components/Link';
import useClientContext from '#site/hooks/useClientContext';
import useScrollToElement from '#site/hooks/useScrollToElement';
import useSiteNavigation from '#site/hooks/useSiteNavigation';
import { useRouter, usePathname } from '#site/navigation.mjs';
import { useSidebarState } from '#site/providers/sidebarStateProvider';

import type { FormattedMessage, NavigationKeys } from '#site/types';
import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
  context?: Record<string, RichTranslationValues>;
};

type MappedItem = {
  label: FormattedMessage;
  link: string;
  target?: string;
  items?: Array<[string, MappedItem]>;
};

type SidebarMappedEntry = {
  label: FormattedMessage;
  link: string;
  target?: string;
  items?: Array<SidebarMappedEntry>;
};

const mapItem = ([, item]: [string, MappedItem]): SidebarMappedEntry => ({
  label: item.label,
  link: item.link,
  target: item.target,
  items: item.items ? item.items.map(mapItem) : [],
});

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context, ...props }) => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname()!;
  const t = useTranslations();
  const { push } = useRouter();
  const { frontmatter } = useClientContext();
  const sidebarRef = useRef<HTMLElement>(null);
  const sideNavigation = getSideNavigation(navKeys, context);
  const { isLeftSidebarCollapsed, toggleLeftSidebar } = useSidebarState();

  // Preserve sidebar scroll position across navigations
  useScrollToElement('sidebar', sidebarRef);

  const mappedSidebarItems =
    // If there's only a single navigation key, use its sub-items
    // as our navigation.
    (navKeys.length === 1 ? sideNavigation[0][1].items : sideNavigation).map(
      ([, { label, items }]: [string, MappedItem]) => ({
        groupName: label,
        items: items ? items.map(mapItem) : [],
      })
    );

  const hasNavigationContent =
    mappedSidebarItems.length > 0 && navKeys.length > 0;

  // If no navigation content, don't render sidebar or controls at all
  if (!hasNavigationContent) {
    return null;
  }

  // Show collapsed rail when sidebar is collapsed (only if there's content)
  if (isLeftSidebarCollapsed) {
    return (
      <CollapsedSidebarRail side="left">
        <SidebarToggleButton
          side="left"
          isCollapsed={isLeftSidebarCollapsed}
          onToggle={toggleLeftSidebar}
        />
      </CollapsedSidebarRail>
    );
  }

  return (
    <Sidebar
      ref={sidebarRef}
      groups={mappedSidebarItems}
      pathname={pathname}
      title={t('components.common.sidebar.title')}
      placeholder={frontmatter?.title}
      onSelect={push}
      as={Link}
      {...props}
    >
      <div className="mb-6 flex justify-end pr-2">
        <SidebarToggleButton
          side="left"
          isCollapsed={isLeftSidebarCollapsed}
          onToggle={toggleLeftSidebar}
        />
      </div>
    </Sidebar>
  );
};

export default WithSidebar;
