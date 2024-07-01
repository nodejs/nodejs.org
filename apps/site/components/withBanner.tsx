import type { FC } from 'react';

import Banner from '@/components/Common/Banner';
import { siteConfig } from '@/next.json.mjs';
import { dateIsBetween } from '@/util/dateUtils';

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];

  if (banner && dateIsBetween(banner.startDate, banner.endDate)) {
    return (
      <Banner type={banner.type} link={banner.link}>
        {banner.text}
      </Banner>
    );
  }

  return null;
};

export default WithBanner;
