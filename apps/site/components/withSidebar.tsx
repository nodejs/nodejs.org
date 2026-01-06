'use client';

import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

import Link from '#site/components/Link';
import { useClientContext } from '#site/hooks/client';
import { useNavigationState } from '#site/hooks/client';
import { useSiteNavigation } from '#site/hooks/generic';
import { useRouter } from '#site/navigation.mjs';

import type { NavigationKeys } from '#site/types';
import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
  context?: Record<string, RichTranslationValues>;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context, ...props }) => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname()!;
  const locale = useLocale();
  const t = useTranslations();
  const { push } = useRouter();
  const { frontmatter } = useClientContext();
  const sidebarRef = useRef<HTMLElement>(null);
  const sideNavigation = getSideNavigation(navKeys, context);

  const localePathname = pathname.replace(`/${locale}`, '');

  // Preserve sidebar scroll position across navigations
  useNavigationState('sidebar', sidebarRef);

  const mappedSidebarItems =
    // If there's only a single navigation key, use it's sub-items
    // as our navigation.
    (navKeys.length === 1 ? sideNavigation[0][1].items : sideNavigation).map(
      ([, { label, items }]) => ({
        groupName: label,
        items: items.map(([, item]) => item),
      })
    );

  return (
    <Sidebar
      ref={sidebarRef}
      groups={mappedSidebarItems}
      pathname={localePathname}
      title={t('components.common.sidebar.title')}
      placeholder={frontmatter?.title}
      onSelect={push}
      as={Link}
      {...props}
    />
  );
};

export default WithSidebar;
