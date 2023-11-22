import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import { useSiteNavigation } from '@/hooks/server';

const TopNavigation: FC = () => {
  const { navigationItems } = useSiteNavigation();

  return (
    <nav aria-label="primary">
      <ul className="list-divider-pipe">
        {navigationItems.map((item, key) => (
          <li key={key}>
            <ActiveLink href={item.link} allowSubPath>
              {item.text}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
