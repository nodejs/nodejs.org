import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import type { FC } from 'react';

import Link from '#components/Link';
import { siteConfig } from '#next.json.mjs';
import { dateIsBetween } from '#util/dateUtils';

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
