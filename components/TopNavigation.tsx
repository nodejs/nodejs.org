import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import { useSiteNavigation } from '@/hooks/server';

const TopNavigation: FC = () => {
  const { navigationItems } = useSiteNavigation();

  return (
    <nav aria-label="primary">
      <ul className="list-divider-pipe">
        {navigationItems.map(({ link, text }) => (
          <li key={link}>
            <ActiveLink href={link} allowSubPath>
              {text}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
