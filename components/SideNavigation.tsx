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

  const sideNavigationItems = getSideNavigation(navigationKey, context);

  return (
    <nav aria-label="secondary">
      <ul>
        {sideNavigationItems.map(item => (
          <li key={item.key}>
            <ActiveLink href={item.link}>{item.text}</ActiveLink>

            {item.items.length > 0 && (
              <ul>
                {item.items.map(({ link, text, key }) => (
                  <li key={key}>
                    <ActiveLink href={link}>{text}</ActiveLink>
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
