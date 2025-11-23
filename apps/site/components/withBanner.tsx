import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Banner from '@node-core/ui-components/Common/Banner';

import Link from '#site/components/Link';
import { siteConfig } from '#site/next.json.mjs';
import { dateIsBetween } from '#site/util/date';

import type { FC } from 'react';

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];

  if (banner && dateIsBetween(banner.startDate, banner.endDate)) {
    return (
      <Banner type={banner.type}>
        {banner.link ? (
          <Link href={banner.link}>{banner.text}</Link>
        ) : (
          banner.text
        )}
        {banner.link && <ArrowUpRightIcon />}
      </Banner>
    );
  }

  return null;
};

export default WithBanner;
