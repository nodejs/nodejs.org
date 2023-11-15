'use client';

import classNames from 'classnames';
import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { useIsCurrentPathname, useSiteNavigation } from '@/hooks';
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
  const { isCurrentLocaleRoute } = useIsCurrentPathname();

  const sideNavigationItems = getSideNavigation(navigationKey, context);

  const getLinkClasses = (href: string, level: number) =>
    classNames({ active: isCurrentLocaleRoute(href), level });

  return (
    <nav aria-label="secondary">
      <ul>
        {sideNavigationItems.map(item => (
          <li key={item.key} className={getLinkClasses(item.link, item.level)}>
            <Link href={item.link}>{item.text}</Link>

            {item.items.length > 0 && (
              <ul>
                {item.items.map(({ link, level, text, key }) => (
                  <li key={key} className={getLinkClasses(link, level)}>
                    <Link href={link}>{text}</Link>
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
