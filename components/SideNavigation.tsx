import classNames from 'classnames';

import LocalizedLink from './LocalizedLink';
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

  const sideNavigationItems = getSideNavigation(navigationKey, context);

  const getLinkClassName = (href: string) =>
    classNames({ active: isCurrentLocaleRoute(href) });

  return (
    <nav aria-label="secondary">
      <ul>
        {sideNavigationItems.map((item, key) => (
          <li key={key} className={getLinkClassName(item.link)}>
            <LocalizedLink href={item.link}>{item.text}</LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
