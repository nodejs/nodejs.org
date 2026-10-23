'use client';

import CollapsedSidebarRail from '@node-core/ui-components/Common/CollapsedSidebarRail';
import SidebarToggleButton from '@node-core/ui-components/Common/SidebarToggleButton';
import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

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
  disableToggle?: boolean;
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

const WithSidebar: FC<WithSidebarProps> = ({
  navKeys,
  context,
  disableToggle = false,
  ...props
}) => {
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

  // If no navigation content, render empty div to preserve grid structure
  if (!hasNavigationContent) {
    return <div />;
  }

  // Show collapsed rail when sidebar is collapsed and toggle is enabled
  if (isLeftSidebarCollapsed && !disableToggle) {
    return (
      <CollapsedSidebarRail side="left">
        <SidebarToggleButton
          side="left"
          isCollapsed={isLeftSidebarCollapsed}
          onToggle={toggleLeftSidebar}
          ariaLabel={t('components.common.sidebar.expandLeftSidebar')}
          title={t('components.common.sidebar.expandLeftSidebar')}
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
      {!disableToggle && (
        <div className="mb-1 flex justify-end pr-2">
          <SidebarToggleButton
            side="left"
            isCollapsed={isLeftSidebarCollapsed}
            onToggle={toggleLeftSidebar}
            ariaLabel={
              isLeftSidebarCollapsed
                ? t('components.common.sidebar.expandLeftSidebar')
                : t('components.common.sidebar.collapseLeftSidebar')
            }
            title={
              isLeftSidebarCollapsed
                ? t('components.common.sidebar.expandLeftSidebar')
                : t('components.common.sidebar.collapseLeftSidebar')
            }
          />
        </div>
      )}
    </Sidebar>
  );
};

export default WithSidebar;
