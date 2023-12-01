import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type SideNavigationProps = {
  navigationKeys: NavigationKeys[];
  context?: Record<string, RichTranslationValues>;
};

const SideNavigation: FC<SideNavigationProps> = ({
  navigationKeys,
  context,
}) => {
  const { getSideNavigation } = useSiteNavigation();

  const sideNavigation = getSideNavigation(navigationKeys, context);

  const mapItems = (items: ReturnType<typeof getSideNavigation>) => {
    return items.map(([, { link, label, items }]) => (
      <li key={link}>
        {link ? <ActiveLink href={link}>{label}</ActiveLink> : label}

        {items && items.length > 0 && <ul>{mapItems(items)}</ul>}
      </li>
    ));
  };

  return (
    <nav aria-label="secondary">
      <ul>{mapItems(sideNavigation)}</ul>
    </nav>
  );
};

export default SideNavigation;
