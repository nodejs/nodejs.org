import type { FC } from 'react';

import CrossLink from '@/components/Common/CrossLink';
import { useClientContext, useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type WithCrossLinksProps = { navKey: NavigationKeys };

const WithSidebarCrossLinks: FC<WithCrossLinksProps> = ({ navKey }) => {
  const { getSideNavigation } = useSiteNavigation();
  const { pathname } = useClientContext();

  const [[, sidebarNavigation]] = getSideNavigation([navKey]);

  if (!sidebarNavigation || !sidebarNavigation.items) {
    return null; // Return null if sidebar navigation or its items are not available
  }

  const crossLinkItems = sidebarNavigation.items
    .map(([, { items }]) => items.map(([, item]) => item))
    .flat();

  const validCrossLinkItems = crossLinkItems.filter(({ link }) => link);

  const currentItemIndex = validCrossLinkItems.findIndex(
    ({ link }) => link === pathname
  );

  const previousCrossLink =
    currentItemIndex > 0 ? validCrossLinkItems[currentItemIndex - 1] : null;

  const nextCrossLink =
    currentItemIndex < validCrossLinkItems.length - 1
      ? validCrossLinkItems[currentItemIndex + 1]
      : null;

  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-4 xs:grid-cols-1">
      {previousCrossLink && previousCrossLink.link && (
        <CrossLink
          type="previous"
          text={previousCrossLink.label}
          link={previousCrossLink.link}
        />
      )}

      {nextCrossLink && nextCrossLink.link && (
        <CrossLink
          type="next"
          text={nextCrossLink.label}
          link={nextCrossLink.link}
        />
      )}
    </div>
  );
};

export default WithSidebarCrossLinks;
