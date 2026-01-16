import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Banner from '@node-core/ui-components/Common/Banner';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';
import { siteConfig } from '#site/next.json.mjs';
import { dateIsBetween } from '#site/util/date';

import type { FC } from 'react';

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];
  const t = useTranslations();

  if (banner && dateIsBetween(banner.startDate, banner.endDate)) {
    const ariaLabels = {
      default: t('components.banner.announcement'),
      warning: t('components.banner.warning'),
      error: t('components.banner.error'),
    } as const;

    // Fallback to 'default' if no type is specified
    const bannerType = banner.type || 'default';

    return (
      <Banner type={banner.type} aria-label={ariaLabels[bannerType]}>
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
