import Badge from '@node-core/ui-components/Common/Badge';
import type { FC } from 'react';

import Link from '@/components/Link';
import { siteConfig } from '@/next.json.mjs';
import { dateIsBetween } from '@/util/dateUtils';

const WithBadge: FC<{ section: string }> = ({ section }) => {
  const badge = siteConfig.websiteBadges[section];

  if (badge && dateIsBetween(badge.startDate, badge.endDate)) {
    return (
      <Badge
        Wrapper={Link}
        badgeText={badge.title}
        kind={badge.kind}
        href={badge.link}
      >
        {badge.text}
      </Badge>
    );
  }

  return null;
};

export default WithBadge;
