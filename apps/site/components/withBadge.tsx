import type { FC } from 'react';

import Badge from '@/components/Common/Badge';
import { siteConfig } from '@/next.json.mjs';
import { dateIsBetween } from '@/util/dateUtils';

const WithBadge: FC<{ section: string }> = ({ section }) => {
  const badge = siteConfig.websiteBadges[section];

  if (badge && dateIsBetween(badge.startDate, badge.endDate)) {
    return (
      <Badge badgeText={badge.title} kind={badge.kind} href={badge.link}>
        {badge.text}
      </Badge>
    );
  }

  return null;
};

export default WithBadge;
