import classNames from 'classnames';

import LocalisedLink from './LocalisedLink';
import { useLocale } from '../hooks/useLocale';
import { useNavigation } from '../hooks/useNavigation';

import type { NavigationKeys } from '../types';

type SideNavigationProps = {
  navigationKey: NavigationKeys;
  context?: Record<string, Record<string, any>>;
};

const SideNavigation = ({ navigationKey, context }: SideNavigationProps) => {
  const { getSideNavigation } = useNavigation();
  const { isCurrentLocaleRoute } = useLocale();

  const navigationItems = getSideNavigation(navigationKey, context);

  const getLinkClassName = (href: string) =>
    classNames({ active: isCurrentLocaleRoute(href) });

  return (
    <nav aria-label="secondary">
      <ul>
        {navigationItems.map((item, key) => (
          <li key={key} className={getLinkClassName(item.link)}>
            <LocalisedLink href={item.link}>{item.text}</LocalisedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
