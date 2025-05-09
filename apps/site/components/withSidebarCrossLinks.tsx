import type { FC } from 'react';

import CrossLink from '#site/components/Common/CrossLink';
import { useClientContext, useSiteNavigation } from '#site/hooks/server';
import type { NavigationKeys } from '#site/types';

type WithCrossLinksProps = { navKey: NavigationKeys };

const WithSidebarCrossLinks: FC<WithCrossLinksProps> = ({ navKey }) => {
  const { getSideNavigation } = useSiteNavigation();
  const { pathname } = useClientContext();

  const [[, sidebarNavigation]] = getSideNavigation([navKey]);

  const crossLinkItems = sidebarNavigation.items
    .map(([, { items }]) => items.map(([, item]) => item))
    .flat();

  const currentItem = crossLinkItems.findIndex(({ link }) => link === pathname);

  const [previousCrossLink, nextCrossLink] = [
    crossLinkItems[currentItem - 1],
    crossLinkItems[currentItem + 1],
  ];

  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {(previousCrossLink && (
        <CrossLink
          type="previous"
          text={previousCrossLink.label}
          link={previousCrossLink.link}
        />
      )) || <div />}

      {nextCrossLink && (
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
