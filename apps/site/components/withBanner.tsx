'use client';

import { useEffect, useState } from 'react';
import type { FC } from 'react';

import Banner from '@/components/Common/Banner';
import { useLocaleStorage } from '@/hooks';
import { siteConfig } from '@/next.json.mjs';
import { dateIsBetween } from '@/util/dateUtils';
import { twoDateToUIID } from '@/util/stringUtils';

type BannerState = {
  uuid: string;
  hideBanner: boolean;
};

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];
  const UUID = twoDateToUIID(banner.startDate, banner.endDate);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [bannerState, setBannerState] = useLocaleStorage<BannerState>(
    'banner',
    { uuid: UUID, hideBanner: false }
  );

  useEffect(() => {
    if (dateIsBetween(banner.startDate, banner.endDate)) {
      setShouldDisplay(!bannerState.hideBanner);
    }
    if (bannerState.uuid !== UUID) {
      setBannerState({ uuid: UUID, hideBanner: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerState.hideBanner]);

  const handleBannerHiding = () => {
    setBannerState({ ...bannerState, hideBanner: true });
  };

  if (shouldDisplay) {
    return (
      <Banner
        type={banner.type}
        link={banner.link}
        onHiding={handleBannerHiding}
      >
        {banner.text}
      </Banner>
    );
  }
};

export default WithBanner;
