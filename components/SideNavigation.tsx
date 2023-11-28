import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type SideNavigationProps = {
  navigationKey: NavigationKeys;
  context?: Record<string, RichTranslationValues>;
};

const SideNavigation: FC<SideNavigationProps> = ({
  navigationKey,
  context,
}) => {
  const { getSideNavigation } = useSiteNavigation();

  const [[, sideNavigationItems]] = getSideNavigation([navigationKey], context);

  return (
    <nav aria-label="secondary">
      <ul>
        {sideNavigationItems.items!.map(([key, { link, label, items }]) => (
          <li key={key}>
            {link ? <ActiveLink href={link}>{label}</ActiveLink> : label}

            {items && items.length > 0 && (
              <ul>
                {items.map(([key, { link, label }]) => (
                  <li key={key}>
                    <ActiveLink href={link}>{label}</ActiveLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
