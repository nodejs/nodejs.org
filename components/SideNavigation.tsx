import classNames from 'classnames';
import type { FC } from 'react';

import { useLocale } from '@/hooks/useLocale';
import { useNavigation } from '@/hooks/useNavigation';
import type { NavigationKeys } from '@/types';

import LocalizedLink from './LocalizedLink';

type SideNavigationProps = {
  navigationKey: NavigationKeys;
  context?: Record<string, Record<string, string | JSX.Element | undefined>>;
};

const SideNavigation: FC<SideNavigationProps> = ({
  navigationKey,
  context,
}) => {
  const { getSideNavigation } = useNavigation();
  const { isCurrentLocaleRoute } = useLocale();

  const sideNavigationItems = getSideNavigation(navigationKey, context);

  const getLinkClasses = (href: string, level: number) =>
    classNames({ active: isCurrentLocaleRoute(href), level });

  return (
    <nav aria-label="secondary">
      <ul>
        {sideNavigationItems.map((item, key) => (
          <li key={key} className={getLinkClasses(item.link, item.level)}>
            <LocalizedLink href={item.link}>{item.text}</LocalizedLink>

            {item.items.length > 0 && (
              <ul>
                {item.items.map(({ link, level, text }, sKey) => (
                  <li key={sKey} className={getLinkClasses(link, level)}>
                    <LocalizedLink href={link}>{text}</LocalizedLink>
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
