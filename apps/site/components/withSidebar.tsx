'use client';

import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import Link from '#site/components/Link';
import useClientContext from '#site/hooks/useClientContext';
import useScrollToElement from '#site/hooks/useScrollToElement';
import useSiteNavigation from '#site/hooks/useSiteNavigation';
import { useRouter, usePathname } from '#site/navigation.mjs';

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
  const locale = useLocale();
  const t = useTranslations();
  const { push } = useRouter();
  const { frontmatter } = useClientContext();
  const sidebarRef = useRef<HTMLElement>(null);
  const sideNavigation = getSideNavigation(navKeys, context);

  // Preserve sidebar scroll position across navigations
  useScrollToElement('sidebar', sidebarRef);

  useEffect(() => {
    const scrollActiveIntoView = () => {
      const aside = sidebarRef.current;
      if (!aside) {
        return;
      }

      const active = Array.from(
        aside.querySelectorAll<HTMLAnchorElement>('a[href]')
      ).find(link => link.pathname === window.location.pathname);

      if (!active) {
        return;
      }

      const asideBounds = aside.getBoundingClientRect();
      const activeBounds = active.getBoundingClientRect();

      const offsetTop = activeBounds.top - asideBounds.top + aside.scrollTop;
      const viewTop = aside.scrollTop;
      const viewBottom = viewTop + aside.clientHeight;

      if (offsetTop < viewTop || offsetTop + active.offsetHeight > viewBottom) {
        aside.scrollTop = Math.max(
          0,
          offsetTop - aside.clientHeight / 2 + active.offsetHeight / 2
        );
      }
    };

    const timer = setTimeout(scrollActiveIntoView, 100);
    return () => clearTimeout(timer);
  }, [pathname, locale]);

  const mappedSidebarItems = (
    navKeys.length === 1 ? sideNavigation[0][1].items : sideNavigation
  ).map(([, { label, items }]: [string, MappedItem]) => ({
    groupName: label,
    items: items ? items.map(mapItem) : [],
  }));

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
    />
  );
};

export default WithSidebar;
