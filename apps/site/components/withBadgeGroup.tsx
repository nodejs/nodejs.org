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
        // Ensure that External Links have a target="_blank" and an arrow icon
        // indicating that the link is external and should open in a new tab
        target={/^https?:/.test(badge.link) ? '_blank' : undefined}
      >
        {badge.text}
      </BadgeGroup>
    );
  }

  return null;
};

export default WithBadgeGroup;
