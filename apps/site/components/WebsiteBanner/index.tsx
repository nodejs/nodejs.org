import { siteConfig } from '#site/next.json.mjs';

import type { FC } from 'react';

import Banner from './Banner';

const WebsiteBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];

  return banner ? <Banner banner={banner} /> : null;
};

export default WebsiteBanner;
