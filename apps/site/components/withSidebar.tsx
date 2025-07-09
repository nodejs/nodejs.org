'use client';

import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
import { useClientContext } from '#site/hooks';
import { useSiteNavigation } from '#site/hooks/server';
import { useRouter } from '#site/navigation.mjs';
import type { NavigationKeys } from '#site/types';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
  context?: Record<string, RichTranslationValues>;
  showProgressionIcons?: boolean;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context, ...props }) => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname()!;
  const locale = useLocale();
  const t = useTranslations();
  const { push } = useRouter();
  const { frontmatter } = useClientContext();
  const sideNavigation = getSideNavigation(navKeys, context);

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
      groups={mappedSidebarItems}
      pathname={pathname.replace(`/${locale}`, '')}
      title={t('components.common.sidebar.title')}
      placeholder={frontmatter?.title}
      onSelect={push}
      as={Link}
      {...props}
    />
  );
};

export default WithSidebar;
