import type { FC } from 'react';

import BannerWithLink from '@/components/Common/BannerWithLink';
import { siteConfig } from '@/next.json.mjs';
import { dateIsBetween } from '@/util/dateUtils';

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];

  if (banner && dateIsBetween(banner.startDate, banner.endDate)) {
    return (
      <BannerWithLink type={banner.type} link={banner.text}>
        {banner.text}
      </BannerWithLink>
    );
  }

  return null;
};

export default WithBanner;
