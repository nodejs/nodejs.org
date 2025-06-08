import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import type { FC } from 'react';

import Link from '#site/components/Link';
import { siteConfig } from '#site/next.json.mjs';
import { dateIsBetween } from '#site/util/date';

const WithBadgeGroup: FC<{ section: string }> = ({ section }) => {
  const badge = siteConfig.websiteBadges[section];

  if (badge && dateIsBetween(badge.startDate, badge.endDate)) {
    return (
      <BadgeGroup
        as={Link}
        badgeText={badge.title}
        kind={badge.kind}
        href={badge.link}
      >
        {badge.text}
      </BadgeGroup>
    );
  }

  return null;
};

export default WithBadgeGroup;
