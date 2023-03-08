import Link from 'next/link';

import { useSiteConfig } from '../../hooks/useSiteConfig';
import { dateIsBetween } from '../../util/dateIsBetween';

const Banner = () => {
  const siteConfig = useSiteConfig();

  // Note.: This is hardcoded and going to be replaced by the `nodejs/nodejs.dev` codebase
  if (siteConfig.websiteBanners && siteConfig.websiteBanners['index']) {
    const indexBanner = siteConfig.websiteBanners['index'];

    const showBanner = dateIsBetween(
      indexBanner.startDate,
      indexBanner.endDate
    );

    if (showBanner && indexBanner.text) {
      return (
        <p className="home-version home-version-banner">
          <Link href={indexBanner.link}>{indexBanner.text}</Link>
        </p>
      );
    }

    if (showBanner && indexBanner.html) {
      return (
        <Link
          href={indexBanner.link}
          dangerouslySetInnerHTML={{ __html: indexBanner.html }}
        />
      );
    }
  }

  return null;
};

export default Banner;
